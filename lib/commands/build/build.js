'use strict';

var Command = require('../../Command');
var commandOptions = require('./options');
var merge = require('merge');
var metalToolsBuildAmd = require('metal-tools-build-amd');
var metalToolsBuildGlobals = require('metal-tools-build-globals');
var metalToolsSoy = require('metal-tools-soy');
var soyOptions = require('../soy/options');

var namesToFn = {
  amd: metalToolsBuildAmd,
  globals: metalToolsBuildGlobals
};

Command.register({
  desc: 'Compiles ES2015 js files to the chosen ES5 format',

  name: 'build',

  run: function(options, callback) {
    var queue = [runSoy];
    for (var i = 0; i < options.format.length; i++) {
      queue.push(runBuild.bind(null, i));
    }
    runNext(queue, 0, options, callback);
  },

  yargs: function(yargs) {
    soyOptions = merge({}, soyOptions);
    soyOptions.soySrc = merge({}, soyOptions.s);
    delete soyOptions.soySrc.alias;
    soyOptions.soyDest = merge({}, soyOptions.d);
    delete soyOptions.soyDest.alias;
    delete soyOptions.s;
    delete soyOptions.d;

    return yargs
      .options(commandOptions)
      .options(soyOptions)
      .help('help')
      .argv;
  }
});

function runBuild(index, options) {
  var format = options.format[index];
  var dest = options.dest[index];
  options = merge({}, options, {
    dest: dest ? dest : options.dest[options.dest.length - 1]
  });
  return namesToFn[format](options);
}

function runNext(queue, index, options, callback) {
  queue[index](options).on('end', function() {
    if (index === queue.length - 1) {
      callback();
    } else {
      runNext(queue, index + 1, options, callback);
    }
  });
}

function runSoy(options) {
  options = merge({}, options, {
    src: options.soySrc,
    dest: options.soyDest
  });
  return metalToolsSoy(options);
}
