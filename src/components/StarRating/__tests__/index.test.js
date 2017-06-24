import ko from 'knockout';
import { expect } from 'chai';
import koSuite from 'test/koSuite';
import Subject from '..';

describe('Components::StarRating', () => {
  koSuite(this, Subject, { rating: ko.observable(3) });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('renders stars correctly', () => {
    expect(subject.node.find('.fa-star').length).to.eq(3);
    expect(subject.node.find('.fa-star-o').length).to.eq(2);
  });

  it('does not render more than 5 stars', () => {
    subject.params.rating(6);
    expect(subject.node.find('.fa-star').length).to.eq(5);
  });

  context('rating has fractional part', () => {
    beforeEach(() => {
      subject.params.rating(2.3);
    });

    it('renders a half star for the fractional part', () => {
      expect(subject.node.find('.fa-star').length).to.eq(2);
      expect(subject.node.find('.fa-star-half-o').length).to.eq(1);
    });
  });
});
