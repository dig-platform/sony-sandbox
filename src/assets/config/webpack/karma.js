/* eslint-env node */
const base = require('./base');
const path = require('path');
const { merge } = require('@rails/webpacker')
const i18nMock = path.resolve(__dirname, '../../spec/javascripts/support/helpers/i18n.js');

module.exports = merge(base, {
  devtool: 'source-map',
  resolve: {
    alias: {
      'i18n-js': i18nMock,
    }
  },
  optimization: {
    minimize: false,
  },
  output: {
    pathinfo: false
  },
  watchOptions: {
    aggregateTimeout: 2000,
    ignored: /_spec\.js$/
  }
});

delete module.exports.entry;
