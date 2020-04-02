const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: path.join(__dirname, '..', 'client', 'src', 'index.js')
    }, 
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, '..', 'client','public', 'index.html')
            })
    ]
}