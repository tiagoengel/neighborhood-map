const loadTest = require.context('../src', true, /.test.js$/);
loadTest.keys().forEach(loadTest);
