const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // 占位符[ext] [name] [hash]
          name: '[path][name][hash].[ext]',
          // 发布目录，在html文件中的src属性中添加
          // publicPath: 'https://abc.com/img',
          // 配置自定义文件的上下文，默认为 webpack.config.js
          // context: '../',
          outputPath: 'images',
          limit: 10240
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
