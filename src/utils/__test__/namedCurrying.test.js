import sinonSuite from 'test/sinonSuite';
import { assert } from 'chai';
import namedCurrying from '../namedCurrying';

describe('Utils::namedCurrying', () => {
  const sinon = sinonSuite();
  let spy;
  let fn;

  beforeEach(() => {
    spy = sinon.spy();
    fn = namedCurrying(['isReady', 'conn'], spy);
  });

  it('calls the callback only when all args are provided', () => {
    fn({ isReady: true });
    fn({ isReady: true });
    sinon.clock.tick(1);
    assert.callCount(spy, 0);
    fn({ conn: '1' });
    sinon.clock.tick(1);
    assert.callCount(spy, 1);
  });

  it('calls the callback with the right arguments', () => {
    fn({ isReady: true, conn: '1' });
    sinon.clock.tick(1);
    assert.calledWith(spy, { isReady: true, conn: '1' });
  });
});
