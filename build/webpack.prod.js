const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
module.exports = merge(commonConfig, prodConfig)
