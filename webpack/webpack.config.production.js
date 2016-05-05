const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanPluginPaths = ['dist'];
const cleanPluginOpts = {
  root: path.resolve(__dirname, '..'),
  verbose: false
};

const uglifyPluginOpts = {
  compress: {
    warnings: false
  }
};

module.exports = {
  devtool: false,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint?{rules:{\'eol-last\':0}}'
    }
  },
  plugins: [
    new CleanWebpackPlugin(cleanPluginPaths, cleanPluginOpts),
    new webpack.optimize.UglifyJsPlugin(uglifyPluginOpts),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
