const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle[hash].js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      resolve('public'),
      resolve('node_modules')
    ],
    alias: {
      assets: resolve('./public/assets')
    }
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }]
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
      include: [resolve('public')],
      loader: 'happypack/loader?id=happyBabel'
    }]
  },
  plugins: [
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
    new HappyPack({
      id: 'happyBabel',
      loaders: ['babel-loader']
    })
  ]
};
