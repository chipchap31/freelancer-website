const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '..', 'frontend', 'src', 'index.js'),
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '..', 'static'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [{
                    loader: 'style-loader',
                },
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()

    ]
}