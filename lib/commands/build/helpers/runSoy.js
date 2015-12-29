'use strict';

var merge = require('merge');
var metalToolsSoy = require('metal-tools-soy');

module.exports = function(options) {
  options = merge({}, options, {
    src: options.soySrc,
    dest: options.soyDest
  });
  return metalToolsSoy(options);
};
