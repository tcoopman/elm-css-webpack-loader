'use strict';

var _ = require('lodash');
var loaderUtils = require('loader-utils');
var elmCompiler = require('node-elm-compiler');
var elmCss = require('elm-css');
var temp = require('temp').track();

var cachedDependencies = [];

var validOptions = ['cwd', 'cache', 'yes', 'emitWarning', 'debug', 'module', 'stylesheetsPort', 'pathToMake'];

var defaultOptions = {
  cwd: '.',
  cache: false,
  yes: true,
  module: 'Stylesheets',
  stylesheetsPort: 'files',
  pathToMake: undefined,
};

var getInput = function() {
  return this.resourcePath;
};

var getOptions = function() {
  var globalOptions = this.options.elm || {};
  var loaderOptions = loaderUtils.getOptions(this);
  return _.extend({
    emitWarning: this.emitWarning
  }, defaultOptions, globalOptions, loaderOptions);
};

var addDependencies = function(dependencies) {
  cachedDependencies = dependencies;
  dependencies.forEach(this.addDependency.bind(this));
};

module.exports = function run() {
  this.cacheable && this.cacheable();

  var callback = this.async();

  if (!callback) {
    throw 'elm-css-webpack-loader currently only supports async mode.';
  }

  var input = getInput.call(this);
  var options = getOptions.call(this);

  var givenInvalidOptions = _.difference(_.keys(options), validOptions);

  if (givenInvalidOptions.length > 0) {
    return callback(new Error('Unknown elm-css options: ' + givenInvalidOptions));
  }

  var dependencies = Promise.resolve()
    .then(function() {
      if (!options.cache || cachedDependencies.length === 0) {
        return elmCompiler.findAllDependencies(input).then(addDependencies.bind(this));
      }
      else {
        return null;
      }
    }.bind(this));

	temp.mkdir('cssTemp', function(err, dirPath) {
		if (err) {
			callback(new Error('Could not create a temp directory ' + err));
		}

		elmCss(options.cwd, input, dirPath, options.module, options.stylesheetsPort, options.pathToMake)
			.then(function(output) {
				callback(null, output.map(function(o) { return o.content; }).join(''));
			})
			.catch(function(err) {
				callback(new Error('Compiler process exited with error ' + err));
			});
	});
};
