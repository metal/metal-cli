'use strict';

var Command = require('../../Command');
var commandOptions = require('./options');
var runBuild = require('./helpers/runBuild');
var runSoy = require('./helpers/runSoy');
var watch = require('glob-watcher');

Command.register({
  desc: 'Watches soy and js files, building them when they change',

  name: 'watch',

  run: function(options) {
		watch([options.soySrc], function() {
      runSoy(options);
		});

		watch([options.src], function() {
      for (var i = 0; i < options.format.length; i++) {
        runBuild(i, options);
      }
		});
  },

  yargs: function(yargs) {
    return yargs
      .options(commandOptions)
      .help('help')
      .argv;
  }
});
