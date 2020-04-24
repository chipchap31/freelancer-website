
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '..', 'frontend', 'src', 'index.js')
  ],
  module: {
    rules: [
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
    ]
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'frontend', 'src', 'index.html')
    })
  ]
}