const path = require('path');
const MiniCssplugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.conf.js');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../')
    }),
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
        from: path.resolve(__dirname, '../public/assets'),
        to: path.resolve(__dirname, '../build/assets'),
      }
    ])
  ]
});
