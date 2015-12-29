'use strict';

var formats = require('./formats');
var merge = require('merge');

module.exports = function(formatIndex, options) {
  var format = options.format[formatIndex];
  options = merge({}, options);
  if (options.dest[formatIndex]) {
    options.dest = options.dest[formatIndex];
  } else {
    // If no destination directory was set for this build format,
    // let its default be used.
    delete options.dest;
  }
  return formats[format](options);
};
