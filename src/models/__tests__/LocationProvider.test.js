import { expect } from 'chai';
import sinonSuite from 'test/sinonSuite';
import LocationProvider from '../LocationProvider';

describe('Models::LocationProvider', () => {
  const sinon = sinonSuite({ useFakeTimers: false });

  beforeEach(() => {
    LocationProvider.currentLocation(null);
  });

  it('fetches the location using HTML 5 API', (done) => {
    sinon.stub(navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
      cb({
        coords: { latitude: 1, longitude: 2 }
      });
    });
    LocationProvider.fetchCurrentLocation().then(() => {
      expect(
        LocationProvider.currentLocation()
      ).to.deep.equal({ lat: 1, lng: 2 });
      done();
    }).catch(done);
  });

  it('fallbacks to ipinfo.io', (done) => {
    sinon.stub(navigator.geolocation, 'getCurrentPosition').callsFake((cb, err) => {
      err('test');
    });
    sinon.server.respondWith((request) => {
      request.respond(
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ loc: '1,-2' })
      );
    });
    sinon.server.respondImmediately = true;
    LocationProvider.fetchCurrentLocation().then(() => {
      expect(
        LocationProvider.currentLocation()
      ).to.deep.equal({ lat: 1, lng: -2 });
      done();
    }).catch(done);
  });

  it('gives up and records the error', (done) => {
    sinon.stub(navigator.geolocation, 'getCurrentPosition').callsFake((cb, err) => {
      err('test');
    });
    sinon.server.respondWith((request) => {
      request.respond(500);
    });
    sinon.server.respondImmediately = true;
    LocationProvider.fetchCurrentLocation().then(() => {
      expect(
        LocationProvider.currentLocation()
      ).to.equal(null);
      expect(
        LocationProvider.error().status
      ).to.equal(500);
      done();
    }).catch(done);
  });

  it('sets isFetching while data is loading', (done) => {
    sinon.stub(navigator.geolocation, 'getCurrentPosition').callsFake((cb, err) => {
      err('test');
    });
    sinon.server.respondWith((request) => {
      request.respond(500);
    });
    sinon.server.respondImmediately = true;
    const p = LocationProvider.fetchCurrentLocation();
    expect(LocationProvider.isFetching()).to.eq(true);
    p.then(() => {
      expect(LocationProvider.isFetching()).to.eq(false);
      done();
    }, done);
  });
});
