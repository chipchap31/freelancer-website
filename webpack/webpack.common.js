const path = require('path');

const autoprefixer = require('autoprefixer')
module.exports = {
    entry: {
        main: path.join(__dirname, '..', 'frontend', 'src', 'index.js')
    }, 
    output: {
        publicPath: '/static/',
        path: path.resolve(__dirname,'..', 'frontend', 'static'),
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
    }
}