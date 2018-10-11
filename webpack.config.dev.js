'use strict';

const path = require('path');
const webpack = require('webpack');
const ENV = 'development';

process.env.NODE_ENV = JSON.stringify(ENV);
process.env.BABEL_ENV = JSON.stringify(ENV);

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, '/src'),
    entry: {
        main: ['webpack-hot-middleware/client', './index'],
        common: ['./Api']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV),
            },
            __DEV__: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                loaders: [
                    'style-loader',
                    'postcss-loader'
                ],
            }
        ]
    }
};
