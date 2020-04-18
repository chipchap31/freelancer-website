const path = require('path');

const autoprefixer = require('autoprefixer');
const dev = process.env.NODE_ENV == 'dev'
module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '..', 'frontend', 'src', 'index.js')
  ]

  ,
  output: {
    publicPath: dev ? '/' : '/static/',
    path: path.resolve(__dirname, '..', 'frontend', 'static'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
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
        test: /\.(less)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
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
  devServer: {
    port: 5000,
    open: true,
    contentBase: path.resolve(__dirname, '..', 'frontend', 'static'),
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },

}