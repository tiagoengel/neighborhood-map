import chai from 'chai';
import chaiJquery from 'chai-jquery';

chai.use(chaiJquery);
const loadTest = require.context('../src', true, /.test.js$/);
loadTest.keys().forEach(loadTest);
