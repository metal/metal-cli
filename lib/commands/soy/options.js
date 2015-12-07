'use strict';

var metalToolsSoyOptions = require('metal-tools-soy/lib/options');

module.exports = {
  s: {
      alias: 'src',
      default: metalToolsSoyOptions.src,
      describe: 'The path globs to the soy files to be compiled.',
      type: 'array'
  },
  d: {
      alias: 'dest',
      default: metalToolsSoyOptions.dest,
      describe: 'The directory where the compiled files will be stored.',
      type: 'string'
  },
  l: {
      alias: 'soyLocales',
      describe: 'The locales that the soy files should be compiled to.',
      type: 'array'
  },
  m: {
      alias: 'soyMessageFilePathFormat',
      describe: 'The path to the file with translations for soy template messages.',
      type: 'string'
  }
};
