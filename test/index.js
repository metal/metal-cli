'use strict';

var assert = require('assert');
var del = require('del');
var fs = require('fs');
var childProcess = require('child_process');

describe('Metal CLI', function() {
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
    beforeEach(function(done) {
      del('test/fixtures/src/**/*.soy.js').then(function() {
        done();
      });
    });

    it('should compile soy files when "soy" command is run', function(done) {
      childProcess.spawn(
        'node',
        ['index.js', 'soy', '-s', 'test/fixtures/src/**/*.soy', '-d', 'test/fixtures/src']
      ).on('close', function(code) {
        assert.strictEqual(0, code);
        assert.ok(fs.readFileSync('test/fixtures/src/Foo.soy.js'));
        done();
      });
    });
  });
});
