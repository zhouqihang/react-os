const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const config = require('./webpack.config');

process.env.NODE_ENV = 'development';

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        // host: "0.0.0.0",
        open: true,
        quiet: true,
        publicPath: '/',
        overlay: { errors: true, }
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
    ]
})