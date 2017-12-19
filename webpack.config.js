const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'goodshare.min.js': './src/goodshare.js'
  },
  output: {
    path: path.resolve(__dirname, ''), filename: '[name]', chunkFilename: "[id]"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]')
  ]
};
