const loadTest = require.context('../src', true, /.test.js$/);
loadTest.keys().forEach(loadTest);

// import jsdomify from 'jsdomify';

// before(() => {
//   jsdomify.create();
// });

// beforeEach(() => {
//   jsdomify.clear();
// });

// after(() => {
//   jsdomify.destroy();
// });
