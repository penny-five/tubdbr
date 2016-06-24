const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlPluginOpts = {
  title: 'tbdbr',
  template: 'src/index.ejs',
  hash: false
};

if (!process.env.YOUTUBE_API_KEY) throw Error('Youtube API key missing');
const definePluginOpts = {
  'process.env': {
    NODE_ENV: `"${process.env.NODE_ENV}"`,
    YOUTUBE_API_KEY: `"${process.env.YOUTUBE_API_KEY}"`
  }
};

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    root: path.resolve(__dirname, '../src'),
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      store: path.resolve(__dirname, '../src/store')
    }
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
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
        loader: 'file'
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
    new webpack.DefinePlugin(definePluginOpts),
    new HtmlWebpackPlugin(htmlPluginOpts),
    new ExtractTextPlugin('styles.[contenthash].css')
  ]
};
