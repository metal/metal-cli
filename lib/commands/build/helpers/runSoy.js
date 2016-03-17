'use strict';

var merge = require('merge');
var metalToolsSoy = require('metal-tools-soy');

module.exports = function(options) {
  options = merge({}, options, {
    dest: options.soyDest,
    skipMetalGeneration: options.soySkipMetalGeneration,
    src: options.soySrc
  });

  console.info('Compiling soy');
  var stream = metalToolsSoy(options);
  stream.on('end', function() {
    console.info('Finished compiling soy');
  });
  return stream;
};
