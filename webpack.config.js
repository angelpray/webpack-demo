const path = require('path');
const autoprefixer = require('autoprefixer');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssplugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle[hash].js'
  },
  devServer: {
    contentBase: './build', // 设置服务器访问时的基本目录
    host: 'localhost', // 服务器的ip访问地址
    port: 8080, // 端口
    open: true // 自动打开页面
  },
  module: {
    rules: [{
      test: /\.css$/,
      // use: ExtractTextPlugin.extract({
      //   // 提取css样式
      //   fallback: 'style-loader',
      //   // CSS加载
      //   use: 'css-loader'
      // })
      use: [MiniCssplugin.loader, 'css-loader']
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        attrs: ['img:src', 'img:data-src']
      }
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: [
                'ie >= 8', // ie版本大于等于ie8
                'Firefox >= 20', // 火狐浏览器大于20版本
                'Safari >= 5', // safari大于5版本
                'Android >= 4', // 版本大于Android4
                'Ios >= 6', // 版本大于ios6
                'last 4 version' // 浏览器最新的四个版本
              ]
            })
          ]
        }
      }]
    },
    {
      test: /\.scss/,
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: [
                'ie >= 8', // ie版本大于等于ie8
                'Firefox >= 20', // 火狐浏览器大于20版本
                'Safari >= 5', // safari大于5版本
                'Android >= 4', // 版本大于Android4
                'Ios >= 6', // 版本大于ios6
                'last 4 version' // 浏览器最新的四个版本
              ]
            })
          ]
        }
      }]
    },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[path]avatar.jpg',
          context: './',
          // 发布路径
          // publicPath: '../images',
          outputPath: './images'
        }
      }]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: './fonts'
        }
      }]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      // use: 'babel-loader'
      // 第二种方式进行es6编译
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  // 第三方js库处理方式一
  // resolve: {
  //   alias: {
  //     jQuery: path.resolve(__dirname, 'public/js/jquery.js')
  //   }
  // },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     jQuery: 'jQuery'
  //   })
  // ]
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'webpack.html',
      minify: {
        minimize: true,
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyElements: true
      },
      hash: true
    }),
    // new ExtractTextPlugin('./css/[name].css')
    new MiniCssplugin({
      filename: './css/index.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true }
          }
        ]
      },
      canPrint: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/public/assets'),
        to: path.join(__dirname, '/build/assets'),
      }
    ]),
  ]
};
