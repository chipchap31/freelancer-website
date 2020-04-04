
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '..', 'frontend', 'src', 'index.html')
        })
      ]
}