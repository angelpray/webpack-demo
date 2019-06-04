const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[path][name][hash].[ext]',
            outputPath: 'images',
            limit: 10240
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.less$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: true
          }
        }, 'less-loader', 'postcss-loader']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  }
}
