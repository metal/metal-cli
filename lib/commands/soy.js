'use strict';

var metalToolsSoy = require('metal-tools-soy');
var metalToolsSoyOptions = require('metal-tools-soy/lib/options');
var Command = require('../Command');

Command.register({
  desc: 'Compiles soy files to be Metal components',
  
  name: 'soy',

  run: metalToolsSoy,

  yargs: function(yargs) {
    return yargs
      .option('s', {
          alias: 'src',
          default: metalToolsSoyOptions.src,
          describe: 'The path globs to the soy files to be compiled.',
          type: 'array'
      })
      .option('d', {
          alias: 'dest',
          default: metalToolsSoyOptions.dest,
          describe: 'The directory where the compiled files will be stored.',
          type: 'string'
      })
      .option('l', {
          alias: 'soyLocales',
          describe: 'The locales that the soy files should be compiled to.',
          type: 'array'
      })
      .option('m', {
          alias: 'soyMessageFilePathFormat',
          describe: 'The path to the file with translations for soy template messages.',
          type: 'string'
      })
      .help('help')
      .argv;
  }
});
