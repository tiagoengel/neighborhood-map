import { expect } from 'chai';
import Places from '../Places';

describe('Models::Places', () => {
  beforeEach(() => {
    Places.allPlaces([
      { name: 'foo' }, { name: 'bar' }
    ]);
  });

  it('filters by name', () => {
    Places.filter('fo');
    expect(Places.places()).to.deep.eq([{ name: 'foo' }]);
  });

  it('returns all for empty filter', () => {
    Places.filter('');
    expect(Places.places()).to.deep.eq([{ name: 'foo' }, { name: 'bar' }]);
  });
});
