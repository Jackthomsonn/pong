const path = require('path')
const copy = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app/js/game.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'app')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  },
  plugins: [
    new copy([
      { from: 'src/app' }
    ], {
        ignore: [
          '*.js',
          '*.scss'
        ]
      })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 8080
  }
}