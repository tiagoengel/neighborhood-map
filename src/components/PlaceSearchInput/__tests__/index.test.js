import { expect, assert } from 'chai';
import sinonSuite from 'test/sinonSuite';
import koSuite from 'test/koSuite';
import Places from 'models/Places';
import Subject from '..';

const FILTER_DEBOUNCE_MS = 500;

describe('Components::PlaceSearchInput', () => {
  const sinon = sinonSuite();
  koSuite(Subject, {});

  beforeEach(() => {
    sinon.stub(Places, 'filter');
  });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  describe('#filter', () => {
    afterEach(() => {
      subject.value(null);
      sinon.clock.tick(FILTER_DEBOUNCE_MS);
    });

    it('triggers a filter when `value` changes', () => {
      subject.value('foo');
      sinon.clock.tick(FILTER_DEBOUNCE_MS);
      assert.calledWith(Places.filter, 'foo');
    });

    it('debounces the execution', () => {
      subject.value('bar');
      subject.value('barrr');
      subject.value('barrrrrrr');
      sinon.clock.tick(FILTER_DEBOUNCE_MS);
      assert.callCount(Places.filter, 1);
      assert.calledWith(Places.filter, 'barrrrrrr');
    });

    describe('delete button', () => {
      it('is visible when filter has value', () => {
        expect(subject.node.find('.place-search-input__clear')).to.not.be.visible;
        subject.value('delete me');
        sinon.clock.tick(FILTER_DEBOUNCE_MS);
        expect(subject.node.find('.place-search-input__clear')).to.be.visible;
      });

      it('clears filter when clicked', () => {
        subject.value('delete me');
        sinon.clock.tick(FILTER_DEBOUNCE_MS);
        subject.node.find('.place-search-input__clear').trigger('click');
        sinon.clock.tick(FILTER_DEBOUNCE_MS);
        assert.calledWith(Places.filter, '');
      });
    });
  });

  describe('#clearFilter', () => {
    it('clears value', () => {
      subject.value('foo');
      subject.clearFilter();
      expect(subject.value()).to.eq('');
      sinon.clock.tick(FILTER_DEBOUNCE_MS);
      assert.calledWith(Places.filter, '');
    });
  });
});
