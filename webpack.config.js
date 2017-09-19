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
                    presets: ['es2015'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]')
    ]
};