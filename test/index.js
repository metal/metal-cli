'use strict';

var assert = require('assert');
var del = require('del');
var fs = require('fs');
var childProcess = require('child_process');

describe('Metal CLI', function() {
  beforeEach(function(done) {
    del([
      'test/fixtures/src/**/*.soy.js',
      'test/fixtures/build'
    ]).then(function() {
      done();
    });
  });

  it('should exit with error when invalid command is given', function(done) {
    childProcess.spawn(
      'node',
      ['index.js', 'invalid']
    ).on('close', function(code) {
      assert.strictEqual(1, code);
      done();
    });
  });

  describe('Soy', function() {
    it('should compile soy files when "soy" command is run', function(done) {
      childProcess.spawn(
        'node',
        [
          'index.js',
          'soy',
          '-s',
          'test/fixtures/src/**/*.soy',
          '-d',
          'test/fixtures/src'
        ]
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/src/Foo.soy.js'));
        done();
      });
    });
  });

  describe('Build', function() {
    it('should build js files to "globals" format when "build" command is run', function(done) {
      childProcess.spawn(
        'node',
        [
          'index.js',
          'build',
          '-s',
          'test/fixtures/src/**/*.js',
          '-d',
          'test/fixtures/build/globals'
        ]
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/globals/metal.js'));
        done();
      });
    });

    it('should build js files to "amd" format when "build" command is run for it', function(done) {
      childProcess.spawn(
        'node',
        [
          'index.js',
          'build',
          '-f',
          'amd',
          '-s',
          'test/fixtures/src/**/*.js',
          '-d',
          'test/fixtures/build/amd'
        ]
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/amd/metal/test/fixtures/src/Foo.js'));
        done();
      });
    });

    it('should build js files to "amd-jquery" format when "build" command is run for it', function(done) {
      childProcess.spawn(
        'node',
        [
          'index.js',
          'build',
          '-f',
          'amd-jquery',
          '-s',
          'test/fixtures/src/**/*.js',
          '-d',
          'test/fixtures/build/amd-jquery'
        ]
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/amd-jquery/metal/test/fixtures/src/Foo.js'));

        var contents = fs.readFileSync('test/fixtures/build/amd-jquery/metal/test/fixtures/src/Foo.js', 'utf8');
        assert.notStrictEqual(-1, contents.indexOf('_JQueryAdapter2.default.register(\'foo\', Foo);'));
        done();
      });
    });

    it('should build js files to "jquery" format when "build" command is run for it', function(done) {
      childProcess.spawn(
        'node',
        [
          'index.js',
          'build',
          '-f',
          'jquery',
          '-s',
          'test/fixtures/src/**/*.js',
          '-d',
          'test/fixtures/build/jquery'
        ]
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.existsSync('test/fixtures/build/jquery/metal.js'));

        var contents = fs.readFileSync('test/fixtures/build/jquery/metal.js', 'utf8');
        assert.notStrictEqual(-1, contents.indexOf('JQueryAdapter.register(\'foo\', Foo);'));
        done();
      });
    });
  });
});
