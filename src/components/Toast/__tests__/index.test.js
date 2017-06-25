import { expect } from 'chai';
import sinonSuite from 'test/sinonSuite';
import koSuite from 'test/koSuite';
import Subject, { toast } from '..';

describe('Components::Toast', () => {
  const sinon = sinonSuite();
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
      toast('you should test your code', 'warning');
      expect(subject.node.find('.toast__message')).to.exist;
    });

    afterEach(() => {
      subject.messages([]);
    });

    it('displays the message', () => {
      const message = subject.node.find('.toast__message').text().trim();
      expect(message).to.eq('you should test your code');
      expect(subject.node.find('.toast__message--is-warning')).to.exist;
    });

    it('cleans it after the timeout', () => {
      sinon.clock.tick(10001);
      expect(subject.node.find('.toast__message')).to.not.exist;
    });

    it('cleans it after clicking the close button', () => {
      subject.node.find('.delete').trigger('click');
      expect(subject.node.find('.toast__message')).to.not.exist;
    });
  });
});
