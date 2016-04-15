# Elm CSS loader

Webpack loader for [elm-css](https://github.com/rtfeldman/elm-css) library

## Installation

```sh
$ npm install --save-dev elm-css-webpack-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

In your `webpack.config.js` file:

```js
module.exports = {
  module: {
    loaders: [{
      test: /Stylesheets\.elm$/,
      loader: "style!css!elm-css-webpack"
    }]
  }
};
```
See the [examples](#example) section below for the complete webpack configuration.

### Options:

#### Cache (default false)

You can add `cache=true` to the loader:

```js
  ...
  loader: "elm-css-webpack?cache=true"
  ...
```

If you add this, when using `npm run watch`, the loader will only load the
dependencies at startup. This could be performance improvement, but know that
new files won't be picked up and so won't be watched until you restart webpack.

This flag doesn't matter if you don't use watch mode.

## Notes

### Example

You can find an example in the `example` folder.
To run dev server:

```sh
$ npm install
$ npm run start
```

### Note about noParse

Even though elm-webpack-loader suggests to set the `noParse` option,
`elm-css-webpack-loader` requires this option, otherwise it won't work correctly.

## Revisions

### 1.0.0

Initial release, compatible with `elm-css-2.0.0`