const webpack = require('webpack');
const path = require('path');
module.exports = {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
          })
    ]
}