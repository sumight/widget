var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: './demo/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?{"presets":["es2015"]}',
            exclude: /node_modules/
        }]
    },
    resolve: {
        root: [
            path.resolve(__dirname, 'demo')
        ],
        extensions: [
            '',
            '.js'
        ]
    }
};
