'use strict';

var addJQueryAdapterRegistration = require('metal-tools-build-jquery/lib/pipelines/addJQueryAdapterRegistration');
var consume = require('stream-consume');
var buildAmd = require('metal-tools-build-amd/lib/pipelines/buildAmd');
var metalToolsBuildAmd = require('metal-tools-build-amd');
var metalToolsBuildGlobals = require('metal-tools-build-globals');
var metalToolsBuildJQuery = require('metal-tools-build-jquery');
var vfs = require('vinyl-fs');

function buildAmdJQuery(options) {
  var stream = vfs.src(options.src, {base: options.base})
    .pipe(addJQueryAdapterRegistration())
		.pipe(buildAmd(options))
		.pipe(vfs.dest(options.dest || 'build/amd-jquery'));
  consume(stream);
  return stream;
}

module.exports = {
  amd: metalToolsBuildAmd,
  'amd-jquery': buildAmdJQuery,
  globals: metalToolsBuildGlobals,
  jquery: metalToolsBuildJQuery
};
