#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var Command = require('./lib/Command');
var requireDir = require('require-dir');

requireDir('./lib/commands', {recurse: true});

var command = Command.get();
if (command) {
	var args = Command.getArgv();
	stubConsole(args);
  console.info('Running ' + chalk.cyan('\'' + command.name + '\'') + '...');
  command.run(args, function(err) {
    if (err) {
      console.error(err.toString());
      process.exit(1);
    } else {
      console.info('Finished ' + chalk.cyan('\'' + command.name + '\'') + '...');
      process.exit(0);
    }
  });
} else {
  console.error(chalk.red('Error: ') + 'Invalid command ' + chalk.cyan('\'' + Command.getName() + '\''));
  process.exit(1);
}

function stubConsole(args) {
	if (args.logLevel === 'silent') {
		console.warn = function() {};
	}
}
