const merge = require('webpack-merge');
const common = require('./webpack/webpack.common')
const env = process.env.NODE_ENV == 'dev' ? 'dev' : 'prod';
const envConfig = require(`./webpack/webpack.${env}.js`)

module.exports = merge(common, envConfig);