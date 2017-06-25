const queue = [];

const OriginalPromise = window.Promise;

const WaitablePromise = function Promise(...args) {
  const p = new OriginalPromise(...args);
  queue.push(p);
  p.finally(() => {
    const idx = queue.indexOf(p);
    if (idx > -1) {
      queue.splice(idx, 1);
    }
  });
  return p;
};

WaitablePromise.resolve = Promise.resolve.bind(Promise);
WaitablePromise.reject = Promise.reject.bind(Promise);
WaitablePromise.all = Promise.all.bind(Promise);

window.Promise = WaitablePromise;

/**
 * Register a callback to be executed after all promises are finished.
 *
 * @param {Function} cb the callback.
 */
export default function waitForPromises(cb) {
  Promise.all(queue).finally(cb);
}
