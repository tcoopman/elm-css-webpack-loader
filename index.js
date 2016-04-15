'use strict';

var _ = require('lodash');
var loaderUtils = require('loader-utils');
var elmCompiler = require('node-elm-compiler');
var elmCss = require('elm-css');
var temp = require('temp').track();

var cachedDependencies = [];

var defaultOptions = {
  cwd: ".",
  cache: false,
  yes: true
};

var getInput = function() {
  return loaderUtils.getRemainingRequest(this);
};

var getOptions = function() {
  var globalOptions = this.options.elm || {};
  var loaderOptions = loaderUtils.parseQuery(this.query);
  return _.extend({
    emitWarning: this.emitWarning
  }, defaultOptions, globalOptions, loaderOptions);
};

var addDependencies = function(dependencies) {
  cachedDependencies = dependencies;
  dependencies.forEach(this.addDependency.bind(this));
};

module.exports = function() {
  this.cacheable && this.cacheable();

  var callback = this.async();

  if (!callback) {
    throw 'elm-css-webpack-loader currently only supports async mode.';
  }

  var input = getInput.call(this);
  var options = getOptions.call(this);

  var dependencies = Promise.resolve()
    .then(function() {
      if (!options.cache || cachedDependencies.length === 0) {
        return elmCompiler.findAllDependencies(input).then(addDependencies.bind(this));
      }
      else {
        return null;
      }
    }.bind(this));

	temp.mkdir('cssTemp', (err, dirPath) => {
		if (err) {
			callback('Could not create a temp directory ' + err);
		}

		elmCss(options.cwd, input, dirPath)
			.then(output => {
				callback(null, output.map(o => o.content).join(''));
				temp.cleanupSync();
			})
			.catch(err => {
				callback('Compiler process exited with error ' + err);
				temp.cleanupSync();
			});
	});


};
