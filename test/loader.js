var _ = require('lodash');
var path = require('path');
var crypto = require('crypto');
var assert = require('chai').assert;
var CSSLint = require('csslint').CSSLint;
var compiler = require('node-elm-compiler');
var loader = require('../index.js');

var fixturesDir = path.join(__dirname, 'fixtures');
var cssSource = path.join(fixturesDir, 'Stylesheets.elm');

var toString = Object.prototype.toString;

var isArray = function (obj) {
  return toString.call(obj) === '[object Array]';
};

var hash = function (data) {
  return crypto.createHash('md5').update(data).digest('hex');
};

var compile = function (filename) {
  return compiler.compileToString([filename], {yes: true, cwd: fixturesDir})
    .then(function (data) {
      return [data.toString(), 'module.exports = Elm;'].join('\n');
    });
}

// Mock of webpack's loader context.
var mock = function (source, query, opts, callback) {
  var emittedError;
  var emittedWarning;
  var addedDependencies = [];

  var result = {
    loaders: [],
    loaderIndex: 0,

    resource: source,
    resourcePath: source,

    async: function () { return callback; },

    emitError: function (err) { emittedError = err; },
    emittedError: function () { return emittedError; },
    emitWarning: function (warn) { emittedWarning = warn; },
    emittedWarning: function () { return emittedWarning; },

    addDependency: function (dep) { addedDependencies.push(dep); },
    addedDependencies: function () { return addedDependencies; },

    cacheable: function () {},

    options: {}
  };

  if (query) {
    result.query = '?' + (isArray(query) ? query.join('&') : query);
  }

  if (opts) {
    result.options.elm = opts;
  }

  return result;
};

describe('sync mode', function () {
  var context;

  it('throws error saying it only supports async mode', function () {
    context = mock(cssSource);

    assert.throw(function () {
      loader.call(context, cssSource);
    }, /currently only supports async mode/);
  });
});

describe('async mode', function () {
  var context;
  var options = {
    cwd: fixturesDir
  };

  // Download of Elm may take a while.
  this.timeout(1000000);

  it('compiles the elm code to css', function (done) {

    // going to use CSSLinter to check there is no actual error
    // on CSS
    var callback = function (loaderErr, loaderResult) {
      var result = CSSLint.verify(loaderResult);
      _.each(_.map(result.messages, 'type'), function(errTy) {
        assert.notEqual(errTy,  "error");
      });
      done();
    };

    context = mock(cssSource, null, options, callback);
    loader.call(context, cssSource);
  });


  it('emits warnings for unknown compiler options', function (done) {

    var options = {
      cwd: fixturesDir,
      foo: 'bar'
    };

    assert.throws(function () {
      context = mock(cssSource, null, options, function(){});
      try {
        loader.call(context, cssSource);
      }
      finally {
        done();
      }
    }, /Unknown elm-css options/);

  });

});
