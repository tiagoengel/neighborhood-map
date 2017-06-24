const webpackConfig = require('./webpack.config.js');

module.exports = function init(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'https://code.jquery.com/jquery-3.2.0.min.js',
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
