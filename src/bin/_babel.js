const env = require('../lib/env');
const appModulePath = require('app-module-path');

// Basically makes us able to "import stuff from 'some/source/folder'"
appModulePath.addPath(__dirname + '/../');

// We need the polyfill.
require('babel-polyfill');

// Sourcemaps are nice.
require('source-map-support/register');

// In dev-mode, we use babel-register.
// In prod-mode, the files have already been transpiled.
if (env.dev) {
  require('babel-register');
}