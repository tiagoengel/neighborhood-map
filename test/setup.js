import chai from 'chai';
import sinon from 'sinon';
import chaiJquery from 'chai-jquery';
import 'shims';
import './waitForPromises';

chai.use(chaiJquery);
sinon.assert.expose(chai.assert, { prefix: '' });

const loadTest = require.context('../src', true, /.test.js$/);
loadTest.keys().forEach(loadTest);
