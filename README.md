# Elm CSS loader [![npm version](https://badge.fury.io/js/elm-css-webpack-loader.svg)](https://badge.fury.io/js/elm-css-webpack-loader) [![Travis build Status](https://travis-ci.org/tcoopman/elm-css-webpack-loader.svg?branch=upgrade)](http://travis-ci.org/tcoopman/elm-css-webpack-loader)

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
    rules: [
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm$/],
        use: [
          'elm-hot-loader',
          'elm-webpack-loader'
        ] 
      },
      {
        test: /Stylesheets\.elm$/,
        use: [
          'style-loader',
          'css-loader',
          'elm-css-webpack-loader'
        ]
      }
    ]
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

You can find a more advanced example at 
[elm-bootstrap-webpack-starter](https://github.com/jiwhiz/elm-bootstrap-webpack-starter)


### Note about noParse

Even though elm-webpack-loader suggests to set the `noParse` option,
`elm-css-webpack-loader` requires to parse the stylesheet module.

You can work around the problem by using the following regular expression:
```js
{
  module: {
    noParse: /^((?!Stylesheet).)*\.elm.*$/,
    ...
  }
}
```

## Revisions

### 1.0.0

Initial release, compatible with `elm-css-2.0.0`

