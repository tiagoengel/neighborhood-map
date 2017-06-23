const webpackConfig = require('./webpack.config.js');

module.exports = function init(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/setup.js'
    ],
    preprocessors: {
      'test/setup.js': ['webpack', 'sourcemap'],
    },
    webpack: Object.assign(webpackConfig, { devtool: 'inline-source-map' }),
    webpackMiddleware: {
      stats: 'errors-only'
    },

    browsers: ['Chrome'],
  });
};
