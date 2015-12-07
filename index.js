'use strict';

var chalk = require('chalk');
var Command = require('./lib/Command');
var requireDir = require('require-dir');

requireDir('./lib/commands');

var command = Command.get();
if (command) {
  console.info('Running ' + chalk.cyan('\'' + command.name + '\'') + '...');
  command.run(Command.getArgv()).on('end', function() {
    console.info('Finished ' + chalk.cyan('\'' + command.name + '\'') + '...');
    process.exit(0);
  });
} else {
  console.warn(chalk.red('Error: ') + 'Invalid command ' + chalk.cyan('\'' + Command.getName() + '\''));
  process.exit(1);
}
