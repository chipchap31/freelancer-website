const webpack = require('webpack');
const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 5000,
        historyApiFallback: true,
        open: true,
        contentBase: path.resolve(__dirname, 'client', 'public')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
          })
    ]
}