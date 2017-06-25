import ko from 'knockout';
import { expect, assert } from 'chai';
import sinonSuite from 'test/sinonSuite';
import koSuite from 'test/koSuite';
import GMap from 'GMap';
import Subject from '..';

describe('Components::PlacesList', () => {
  const sinon = sinonSuite();
  let setMap;

  beforeEach(() => {
    setMap = sinon.spy();
    sinon.stub(GMap, 'createPlaceMarker').callsFake(place => ({ id: `marker-${place.id}`, setMap }));
    sinon.stub(GMap, 'centerOnPlace');
    sinon.stub(GMap, 'bounceIt');
    sinon.stub(GMap, 'showInfo');
    sinon.stub(Subject, 'places').value(ko.observableArray());
  });

  koSuite(Subject, {
    places: ko.observableArray([
      { id: '1', name: 'place', vicinity: 'test', rating: 5 },
      { id: '2', name: 'place1', vicinity: 'test1', rating: 3 }
    ])
  });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('renders a list of places', () => {
    expect(subject.node.find('.places__place').length).to.eq(2);
  });

  describe('on selected', () => {
    beforeEach(() => {
      sinon.clock.tick(1); // triggers timeouts
      subject.node.find('.places__place:first-child').trigger('click');
    });

    afterEach(() => {
      subject.selectedPlace(null);
    });

    it('changes the selected place', () => {
      expect(subject.selectedPlace()).to.eq('1');
    });

    it('animates the map marker', () => {
      const marker = { id: 'marker-1', setMap };
      assert.calledWith(GMap.bounceIt, marker);
      assert.calledWith(GMap.showInfo, marker, 'place');
      assert.calledWith(GMap.centerOnPlace, subject.params.places()[0]);
    });

    it('adds --selected modifier', () => {
      expect(subject.node.find('.places__place--selected')).to.exist;
    });

    it('unselects when clicking again', () => {
      subject.node.find('.places__place:first-child').trigger('click');
      expect(subject.node.find('.places__place--selected')).to.not.exist;
      expect(subject.selectedPlace()).to.eq(null);
    });
  });
});
