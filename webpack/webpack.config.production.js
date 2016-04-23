const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanPluginPaths = ['dist'];
const cleanPluginOpts = {
  root: path.resolve(__dirname, '..'),
  verbose: false
};

const definePluginOpts = {
  'process.env': { NODE_ENV: '"production"' }
};

const uglifyPluginOpts = {
  compress: {
    warnings: false
  }
};

module.exports = {
  devtool: false,
  plugins: [
    new CleanWebpackPlugin(cleanPluginPaths, cleanPluginOpts),
    new webpack.DefinePlugin(definePluginOpts),
    new webpack.optimize.UglifyJsPlugin(uglifyPluginOpts),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
