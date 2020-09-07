const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const packageJson = require('../package.json');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        filename: 'static/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)(x?)$/i,
                use: 'babel-loader',
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, '../tsconfig.json'),
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new webpack.DefinePlugin({
            ['process.env']: {
                version: `'${packageJson.version}'`,
                NODE_ENV: process.env.NODE_ENV
            }
        }),
        // new FriendlyErrorsWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }
}