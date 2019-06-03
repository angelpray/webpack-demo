const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [{
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
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: true
        }
      }, 'less-loader', 'postcss-loader']
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  }), new CleanWebpackPlugin()],
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  }
}
