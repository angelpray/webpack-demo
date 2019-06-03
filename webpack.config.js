const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          // 让less文件加载less-loader和postcss-loader，防止跳过了这两个loader
          importLoaders: 2,
          modules: true
        }
      }, 'less-loader', 'postcss-loader']
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    // 生成html的模板
    template: 'src/index.html'
  }), new CleanWebpackPlugin()],
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  }
}
