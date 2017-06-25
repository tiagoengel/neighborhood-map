import { expect, assert } from 'chai';
import koSuite from 'test/koSuite';
import sinonSuite from 'test/sinonSuite';
import Subject from '..';

describe('Components::AppHeader', () => {
  const sinon = sinonSuite();
  koSuite(Subject, { onClickMenu: Function.prototype });

  it('renders', () => {
    expect(subject.node).to.exist;
  });

  it('triggers onClickMenu', () => {
    const onClickMenu = sinon.spy();
    subject.setParams({ onClickMenu });
    subject.node.find('.header__menu-button').trigger('click');
    assert.callCount(onClickMenu, 1);
  });
});
