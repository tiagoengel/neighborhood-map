const path = require('path');
const webpack = require('webpack');

const fullPath = pathName => path.join(__dirname, pathName)

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: fullPath('src/index.js'),
  output: {
    path: fullPath('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: fullPath('src'),
    publicPath: 'http://localhost:8080/assets/'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /css/],
        include: path.join(__dirname, 'public'),
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'public/css'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: ['style-loader', 'css-loader', 'postcss-loader']
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
  }
};
