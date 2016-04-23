const webpack = require('webpack');

module.exports = {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
