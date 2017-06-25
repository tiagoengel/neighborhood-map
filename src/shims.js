import promiseFinally from 'promise.prototype.finally';
import $ from 'jquery';

promiseFinally.shim();

// Adds finally to jquery
const def = $.Deferred;
$.Deferred = function Deferred(...args) {
  const inst = def(...args);
  const realP = inst.promise.bind(inst);
  inst.promise = function p(...pArgs) {
    const promise = realP(...pArgs);
    promise.finally = promise.always;
    return promise;
  };
  inst.finally = inst.always.bind(inst);
  return inst;
};
