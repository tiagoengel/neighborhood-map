import { difference } from 'lodash';

/**
 * Similar to normal currying function but allows for named arguments.
 * Very useful in cases where you only want to call a function when all
 * (generally asynchronous) conditions are met.
 *
 * Example:
 *
 *    const loadData = namedCurrying(['conn', 'domReady']), ({ conn }) => {
 *      // Called only when DOM and conn are ready
 *      const users = conn.loadUsers();
 *    });
 *
 *    // Provide `domReady` when the DOM is ready.
 *    $(() => loadData({ donReady: true }));
 *
 *    // Provide conn
 *    db.connect(conn => loadData({ conn }));
 *
 * @param {array} argNames
 *        list of arguments needed to execute `fn`. Only when all
 *        are provided fn wil be executed
 *
 * @param {Function} cb
 *        function to be executed when all arguments are provided
 *
 */
export default function namedCurrying(argNames, cb) {
  let providedArgs = {};
  return (partial) => {
    providedArgs = Object.assign(providedArgs, partial);
    const missingArgs = difference(argNames, Object.keys(providedArgs));
    if (missingArgs.length === 0) {
      setTimeout(() => cb(providedArgs), 0);
    }
  };
}
