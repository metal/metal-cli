'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var metal = require('gulp-metal');
var yargs = require('yargs');

var argv = yargs
  .demand(1, 1)
  .argv;

metal.registerTasks(argv);

console.log('Starting ' + chalk.cyan('\'' + argv._[0] + '\'') + '...');
gulp.start(argv._[0], function(error) {
  if (error) {
    throw error;
  } else {
    console.log('Finished ' + chalk.cyan('\'' + argv._[0] + '\''));
  }
});
