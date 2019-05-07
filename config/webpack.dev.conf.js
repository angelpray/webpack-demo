const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './build', // 设置服务器访问时的基本目录
    host: 'localhost', // 服务器的ip访问地址
    port: 8080, // 端口
    open: true, // 自动打开页面
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
