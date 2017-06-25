/* eslint-disable no-param-reassign */
import sinon from 'sinon';

function injectSandboxProperties(api, sandbox) {
  [
    'spy',
    'stub',
    'mock',
    'server',
    'clock',
    'restore',
  ].forEach((attr) => {
    const prop = sandbox[attr];
    if (typeof prop === 'function') {
      api[attr] = sandbox[attr].bind(sandbox);
    } else {
      api[attr] = sandbox[attr];
    }
  });
}

function injectUtilitiesMethods(api, sandbox) {
  api.respondJSON = (statusCode = 200, body = {}, requestIndex = -1) => {
    const cursor = requestIndex < 0
      ? sandbox.server.requests.length - 1
      : requestIndex;

    const request = sandbox.server.requests[cursor];
    request.respond(statusCode, { 'Content-Type': 'application/json' }, JSON.stringify(body));
  };

  api.requestCount = () => sandbox.server.requests.length;
}

/**
 * Creates and configures a sinon sandbox to facilitates its use.
 * It will create a fakeServer and fakeTimer by default, if you want
 * to disable any of those just pass it in the config:
 *
 * Example:
 *
 *   const sinon = sinonSuite();
 *
 *   // during tests
 *   .. code that executes a request
 *   sinon.respondJSON(200, { id: 1 });
 *
 * {
 *  useFakeServer: false,
 *  useFakeTimers: false
 * }
 * @param {Object} baseConfig
 */
export default function sinonSuite(baseConfig = {}) {
  let sandbox;
  const api = {};
  const config = Object.assign({
    useFakeServer: true,
    useFakeTimers: true
  }, baseConfig);

  beforeEach(() => {
    sandbox = sinon.sandbox.create(config);
    injectSandboxProperties(api, sandbox);
    injectUtilitiesMethods(api, sandbox);
  });

  afterEach(() => {
    if (sandbox) {
      sandbox.restore();
    }
  });

  return api;
}
