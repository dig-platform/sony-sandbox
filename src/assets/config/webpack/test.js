process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { merge } = require('@rails/webpacker')
const path = require('path');
const webpackConfig = require('./base')

module.exports = merge(webpackConfig, {
  resolve: {
    alias: {
      'bitmovin-player': path.resolve(__dirname, '../../spec/javascripts/support/fake_bitmovin.js'),
    }
  },
  optimization: {
    minimize: false,
    minimizer: [],
  },
  output: {
    pathinfo: false
  },
);
