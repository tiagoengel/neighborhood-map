const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fullPath = pathName => path.join(__dirname, pathName);

const env = process.env.NODE_ENV || 'dev';
const prod = env === 'prod';

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];

if (prod) {
  plugins.push(new ExtractTextPlugin('styles.css'));
}

module.exports = {
  devtool: prod ? false : 'cheap-module-eval-source-map',
  entry: fullPath('src/index.js'),
  output: {
    path: fullPath('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: fullPath('src'),
    publicPath: 'http://localhost:8080/'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /css/],
        include: path.join(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src'),
        use: prod
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          })
          : ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: prod
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
          : ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['file-loader?name=[hash].[ext]']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ],
    alias: {
      test: path.resolve(__dirname, 'test/'),
    }
  },
  externals: {
    jquery: 'jQuery'
  }
};
