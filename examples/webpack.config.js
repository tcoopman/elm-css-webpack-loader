var path = require( 'path' );

module.exports = {
  entry: './index.js',

  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'index.js'
  },

  resolve: {
    extensions: ['.js', '.elm']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/, /Stylesheets\.elm/],
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
          '../index.js'
        ]
      }
    ]
  },

  target: 'web',

  devServer: {
    inline: true,
    stats: 'errors-only'
  }
};
