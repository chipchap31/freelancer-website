const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer')
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
            },
            {
                test: /\.(scss)$/,
                use: [{
                  loader: 'style-loader', 
                }, {
                  loader: 'css-loader', 
                }, {
                  loader: 'postcss-loader',
                  options: {
                    plugins: function () { 
                      return [autoprefixer];
                    }
                  }
                }, {
                  loader: 'sass-loader' 
                }]
              },
              {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              }
        ]
    },
    plugins: [
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, '..', 'client','public', 'index.html')
            })
    ]
}