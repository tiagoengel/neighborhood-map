import { expect } from 'chai';
import sinon from 'sinon';
import koSuite from 'test/koSuite';
import Subject, { toast } from '..';

describe('Components::Toast', () => {
  koSuite(Subject, {});

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('does not render any message', () => {
    expect(subject.node.find('.toast__message')).to.not.exist;
  });

  it('exports toast function', () => {
    expect(typeof toast).to.eq('function');
  });

  describe('#toast', () => {
    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
      toast('you should test your code', 'warning');
      expect(subject.node.find('.toast__message')).to.exist;
    });

    afterEach(() => {
      this.clock.restore();
      subject.messages([]);
    });

    it('displays the message', () => {
      const message = subject.node.find('.toast__message').text().trim();
      expect(message).to.eq('you should test your code');
      expect(subject.node.find('.toast__message--is-warning')).to.exist;
    });

    it('cleans it after the timeout', () => {
      this.clock.tick(10001);
      expect(subject.node.find('.toast__message')).to.not.exist;
    });

    it('cleans it after clicking the close button', () => {
      subject.node.find('.delete').trigger('click');
      expect(subject.node.find('.toast__message')).to.not.exist;
    });
  });
});
