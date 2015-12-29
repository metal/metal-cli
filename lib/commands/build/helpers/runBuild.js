'use strict';

var chalk = require('chalk');
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

  console.info('Building to format: ' + chalk.magenta(format));
  var stream = formats[format](options);
  stream.on('end', function() {
    console.info('Finished building to format: ' + chalk.magenta(format));
  });
  return stream;
};
