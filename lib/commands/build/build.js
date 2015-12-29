'use strict';

var Command = require('../../Command');
var commandOptions = require('./options');
var runBuild = require('./helpers/runBuild');
var runSoy = require('./helpers/runSoy');

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
    return yargs
      .options(commandOptions)
      .help('help')
      .argv;
  }
});

function runNext(queue, index, options, callback) {
  queue[index](options).on('end', function() {
    if (index === queue.length - 1) {
      callback();
    } else {
      runNext(queue, index + 1, options, callback);
    }
  });
}
