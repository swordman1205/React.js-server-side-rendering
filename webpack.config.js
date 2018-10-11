'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = 'production';

process.env.NODE_ENV = JSON.stringify(ENV);
process.env.BABEL_ENV = JSON.stringify(ENV);

module.exports = {
    devtool: false,
    context: path.join(__dirname, '/src'),
    entry: {
        main: './index',
        common: ['./Api']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV),
            },
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused        : true,
                warnings      : false,
                drop_console  : true,
                unsafe        : true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('[name].css', {allChuncks: true}),
    ],
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.(js)x?$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'postcss-loader'
                })
            }
        ]
    }
};
