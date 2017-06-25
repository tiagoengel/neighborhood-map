import { expect } from 'chai';
import koSuite from 'test/koSuite';
import Subject from '..';

describe('Components::Sidebar', () => {
  koSuite(Subject, {});

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('is visible by default', () => {
    expect(subject.visible()).to.eq(true);
    expect(subject.node.find('.sidebar--visible')).to.exist;
  });

  describe('#close', () => {
    it('closes the sidebar', () => {
      subject.close();
      expect(subject.visible()).to.eq(false);
      expect(subject.node.find('.sidebar--visible')).not.to.exist;
    });
  });

  describe('#open', () => {
    it('opens the sidebar', () => {
      subject.open();
      expect(subject.visible()).to.eq(true);
      expect(subject.node.find('.sidebar--visible')).to.exist;
    });
  });

  describe('#toggle', () => {
    it('toggles the sidebar', () => {
      subject.close();
      subject.toggle();
      expect(subject.visible()).to.eq(true);
      subject.toggle();
      expect(subject.visible()).to.eq(false);
    });
  });
});
