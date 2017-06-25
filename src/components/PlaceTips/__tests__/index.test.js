import ko from 'knockout';
import { expect, assert } from 'chai';
import sinonSuite from 'test/sinonSuite';
import koSuite from 'test/koSuite';
import FourSquare from 'FourSquare';

import Subject from '..';

describe('Components::PlaceTips', () => {
  const sinon = sinonSuite();

  koSuite(Subject, {
    visible: ko.observable(false),
    place: {
      id: '1',
      name: 'foo',
      geometry: { location: { lat: () => 1, lng: () => 2 } }
    }
  });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('is not visible', () => {
    expect(subject.node.find('.place-tips')).to.not.be.visible;
  });

  context('visible changes to true', () => {
    let visible;
    beforeEach(() => {
      visible = ko.observable(false);
      subject.setParams({ visible });
    });

    it('set is loading to true', () => {
      visible(true);
      expect(subject.isLoading()).to.eq(true);
    });

    it('only fetches tips once', () => {
      subject.params.place.id = '2';
      visible(true);
      visible(false);
      visible(true);
      expect(sinon.requestCount()).to.eq(1);
    });

    it('calls the Foursquare API', (done) => {
      const fetch = Promise.resolve({ id: 'foo' });
      sinon.stub(FourSquare, 'searchVenue').callsFake(() => fetch);
      sinon.stub(FourSquare, 'getTips');
      subject.params.place.id = '3';
      visible(true);
      fetch.finally(() => {
        assert.called(FourSquare.searchVenue);
        assert.called(FourSquare.getTips);
        done();
      }).catch(done);
    });
  });
});
