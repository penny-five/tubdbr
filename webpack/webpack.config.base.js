const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    root: path.resolve(__dirname, '..', 'src')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  vue: {
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    loaders: {
      scss: ExtractTextPlugin.extract('!css!sass')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'tbdbr',
      template: 'src/index.ejs',
      hash: false
    }),
    new ExtractTextPlugin('styles.[contenthash].css')
  ]
};
