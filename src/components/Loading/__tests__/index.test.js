import { expect } from 'chai';
import koSuite from 'test/koSuite';
import Subject from '..';

describe('Components::Loading', () => {
  koSuite(Subject, { isLoading: true });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('is visible', () => {
    expect(subject.node.find('.loading')).to.exist;
  });

  context('isVisible is false', () => {
    beforeEach(() => {
      subject.setParams({ isLoading: false });
    });

    it('is not visible', () => {
      expect(subject.node.find('.loading')).to.not.exist;
    });
  });
});
