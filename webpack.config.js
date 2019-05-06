const path = require('path');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build', // 设置服务器访问时的基本目录
    host: 'localhost', // 服务器的ip访问地址
    port: 8080, // 端口
    open: true // 自动打开页面
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
