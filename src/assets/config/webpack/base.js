/* eslint-env node */
const { webpackConfig, merge } = require('@rails/webpacker')
const path            = require('path');
const webpack         = require('webpack');
const processEnv      = { RAILS_ENV: process.env.RAILS_ENV };
webpackConfig.plugins.unshift( new webpack.EnvironmentPlugin(processEnv));

let loaders = [
  { global: [ 'jQuery', '$' ], resolves: 'jquery' },
  { global: [ 'I18n' ], resolves: 'i18n-js' },
  { global: [ 'isMobile' ], resolves: 'ismobilejs' },
  { global: [ 'rxjs' ], resolves: 'rxjs' },
].map(({ global, resolves }) => {
  return {
    test: require.resolve(resolves),
    use: [{
      loader: 'expose-loader',
      options: { exposes: global },
    }]
  };
});

// Load ts/tsx through ts-loader
loaders.unshift({
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: 'ts-loader',
});

let rules = webpackConfig['module']['rules'];
let sassRule = rules.find((rule) => rule.test && !Array.isArray(rule.test) && rule.test.test('.scss'))
let sassLoaderIndex = sassRule.use.findIndex((use) => { return /sass-loader/.test(use.loader) });
sassRule.use[sassLoaderIndex].options = { sourceMap: true };
sassRule.use.splice(sassLoaderIndex, 0, { loader: 'resolve-url-loader' });

module.exports = merge(webpackConfig, {
//  profile: true,
//  parallelism: 1,
  module: {
    rules: loaders,
  },
  externals: { RunnerConfiguration: 'RunnerConfiguration' },
  resolve: {
    extensions: [
      '.css',
      '.gif',
      '.html',
      '.jpeg',
      '.jpg',
      '.js',
      '.jsx',
      '.module.css',
      '.module.sass',
      '.module.scss',
      '.png',
      '.sass',
      '.scss',
      '.svg',
      '.ts',
      '.tsx',
    ],
    alias: {
      'moment-timezone': 'moment-timezone/builds/moment-timezone-with-data-10-year-range'
    },
  },
});

