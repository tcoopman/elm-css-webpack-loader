# Elm CSS loader [![Travis build Status](https://travis-ci.org/jiwhiz/elm-css-webpack-loader.svg?branch=upgrade)](http://travis-ci.org/jiwhiz/elm-css-webpack-loader)

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
`elm-css-webpack-loader` requires this option, otherwise it won't work correctly.

## Revisions

### 3.0.0

Upgrade to Elm 0.18, elm-css-8.1.0

### 1.0.0

Initial release, compatible with `elm-css-2.0.0`

