<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webpack](#webpack)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [初始化配置文件](#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
  - [webpack输出内容解析](#webpack%E8%BE%93%E5%87%BA%E5%86%85%E5%AE%B9%E8%A7%A3%E6%9E%90)
  - [Loader](#loader)
    - [文件loader](#%E6%96%87%E4%BB%B6loader)
    - [CSS loader](#css-loader)
    - [CSS预处理 loader](#css%E9%A2%84%E5%A4%84%E7%90%86-loader)
    - [添加浏览器厂商前缀 loader](#%E6%B7%BB%E5%8A%A0%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8E%82%E5%95%86%E5%89%8D%E7%BC%80-loader)
    - [CSS打包模块化](#css%E6%89%93%E5%8C%85%E6%A8%A1%E5%9D%97%E5%8C%96)
    - [打包字体文件](#%E6%89%93%E5%8C%85%E5%AD%97%E4%BD%93%E6%96%87%E4%BB%B6)
  - [Plugins插件](#plugins%E6%8F%92%E4%BB%B6)
  - [entry和output的基本配置](#entry%E5%92%8Coutput%E7%9A%84%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
  - [SourceMap配置](#sourcemap%E9%85%8D%E7%BD%AE)
  - [WebpackDevServer](#webpackdevserver)
    - [提升开发效率](#%E6%8F%90%E5%8D%87%E5%BC%80%E5%8F%91%E6%95%88%E7%8E%87)
  - [Hot Module Replacement，热模块替换](#hot-module-replacement%E7%83%AD%E6%A8%A1%E5%9D%97%E6%9B%BF%E6%8D%A2)
  - [Babel处理ES6语法](#babel%E5%A4%84%E7%90%86es6%E8%AF%AD%E6%B3%95)
- [Tree Shaking](#tree-shaking)
  - [Development 和Production模式](#development-%E5%92%8Cproduction%E6%A8%A1%E5%BC%8F)
    - [差异](#%E5%B7%AE%E5%BC%82)
    - [不同环境的解决方案](#%E4%B8%8D%E5%90%8C%E7%8E%AF%E5%A2%83%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)
  - [Code Splitting，代码拆分](#code-splitting%E4%BB%A3%E7%A0%81%E6%8B%86%E5%88%86)
    - [SplitChunksPlugin插件的其他选项](#splitchunksplugin%E6%8F%92%E4%BB%B6%E7%9A%84%E5%85%B6%E4%BB%96%E9%80%89%E9%A1%B9)
  - [Lazy Loading 懒加载](#lazy-loading-%E6%87%92%E5%8A%A0%E8%BD%BD)
  - [Chunk是什么](#chunk%E6%98%AF%E4%BB%80%E4%B9%88)
  - [Prefetch和preload 模块](#prefetch%E5%92%8Cpreload-%E6%A8%A1%E5%9D%97)
  - [CSS文件代码分割](#css%E6%96%87%E4%BB%B6%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2)
  - [浏览器缓存](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# webpack

- 模块打包工具

## 安装

- 全局安装：不推荐。

- 局部安装：在项目目录中安装`npm i webpack-cli webpack -D`。

- 查看版本：`webpack -v`无法起作用，需要`npx webpack -v`。

- 安装特定webpack版本：`npm i webpack-cli webpack@version -D`。

- webpack-cli作用是在命令行中使用webpack。

## 初始化配置文件

- 可以直接使用webpack原始的默认配置文件进行打包`npx webpack entry.js`

- 自定义编写`webpack.config.js`默认配置文件进行打包
```js
// 引入path生成路径
const path = require('path')
// CommonJS
module.exports = {
  // entry 打包入口文件
  entry: './index.js',
  // output 输出打包文件
  output: {
    // 输出文件名
    filename: 'bundle.js',
    // 输出文件夹名
    path: path.resolve(__dirname, 'bundle')
  }
}
```

- 默认文件名必须是`webpack.config.js`，否则需要使用选项`--config 配置文件名`进行打包

- 结构优化，把源文件放到src中

- 使用`npm scripts`进行配置webpack命令,代替`npx webpack`

## webpack输出内容解析

![](https://image-static.segmentfault.com/103/812/1038122385-5cf49388eccb2_articlex)

- Hash：本次打包对应的唯一hash值
- Version：webpack打包版本
- Time：打包耗时
- Asset：打包文件
- Size：打包文件大小
- Chunks：打包文件对应ID值
- Chunk Names：打包文件对应名字
- 如果没有配置`mode`选项则会出现警告，默认是`production`，打包的文件会被压缩。

## Loader

- 模块的打包方案，识别除js文件外的文件模块。
```js
module: {
  rules: [{
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: 'file-loader',
      options: {
        // 占位符[ext] [name] [hash]
        name: '[name]_[hash].[ext]',
        outputPath: 'images/'
      }
    }
  }]
},

```

### 文件loader

- `url-loader`可以实现`file-loader`所有的功能，但会把图片转化为`base64`字符串。优点：减少一次HTTP请求，缺点：如果图片大，那么js文件就会大，加载js的时间就会变长，页面加载慢。

- `url-loader`最佳实践：`limit`选项进行配置，当大于limit则单独成文件，否则转换成base64字符串。
```js
module: {
  rules: [{
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        // 占位符[ext] [name] [hash]
        name: '[path][name][hash].[ext]',
        // 发布目录，在html文件中的src属性中添加，类似CDN
        // publicPath: 'https://abc.com/img',
        // 配置自定义文件的上下文，默认为 webpack.config.js
        // context: '../',
        outputPath: 'images',
        limit: 10240
      }
    }
  }]
},

```

### CSS loader

- `style-loader css-loader`，style-loader负载挂载，css-loader负责分析css文件的关系。

- 让less或者其他预处理文件加载less-loader和postcss-loader，防止跳过了这两个loader
```js
options: {
  importLoaders: 2,
  modules: true
}
```

### CSS预处理 loader

- 如果需要使用css预处理语言，比如less，则需要它的loader`less-loader`，同时需要css loader。出现多个loader时，执行顺序是从下到上，从右到左。

### 添加浏览器厂商前缀 loader

- 使用`postcss-loader`,需要新建`postcss.config.js`,并在其添加插件`autoprefixer`
```js
// postcss.config.js
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer
  ]
}
// webpack.config.js
{
  test: /\.less$/,
  use: ['style-loader',
  'css-loader',
  'less-loader',
  'postcss-loader'
  ]
}
```

### CSS打包模块化

- css-loader中有一个modules选项，使其为true，导入样式表为style，并将类修改为`style.class`，其中class为样式表中的类。

- 使用模块化CSS会影响CSS中的类名
```js
import avatar from './avatar.jpg';
import style from './layout.less';

let img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
```

### 打包字体文件

- 下载好字体文件，声明好字体，在`webpack.config.js`中使用`file-loader`进行打包。

## Plugins插件

- plugin可以在webpack运行到某个时刻的时候，做一些事情

- `html-webpack-plugin`，需要先引用。自动生成html文件，并把打包生成的js自动引入到html文件中。可以使用`template`选项做出一个HTML模板，插件会根据模板生成html

- `clean-webpack-plugin`,清空上一次打包好的文件夹。

```js
plugins: [new HtmlWebpackPlugin({
  // 生成html的模板
  template: 'src/index.html'
}), new CleanWebpackPlugin()],
```

## entry和output的基本配置

- 可以设置多个入口文件和打包文件

## SourceMap配置

- dist目录下main.js代码出错，sourceMap它是一个映射关系，他知道dist目录下文件出错的行数对应这src目录下的index.js文件的行数。它的作用就是让我们知道src源文件的出错行数。
```js
// source-map，生成一个map映射文件
devtool: 'source-map',
// inline，map映射文件打包到了main.js中
devtool: 'inline-source-map',
// cheap，只需要告诉第几行就好，不需要告诉更详细的的信息
devtool: 'cheap-inline-source-map',
// module，不单告诉打包的src文件错误，也告诉其他第三方库的错误
devtool: 'cheap-module-inline-source-map',
// eval，执行效率最快，但提示的内容可能不全
devtool: 'eval',

// 开发环境推荐
devtool: 'cheap-module-eval-source-map',
// 生产环境推荐
devtool: 'cheap-module-source-map',
```

## WebpackDevServer

### 提升开发效率

- webpack监听文件：`webpack --watch`

- webpackDevServer：webpack没有内置了devServer，需要下载
```js
// webpack.config.js
devServer: {
  contentBase: './dist',
  // 浏览器自动打开页面
  open: true
},
// package.json
"scripts": {
  "start": "webpack-dev-server"
}
```

- 自己写一个服务器，因为webpackDevServer已经很成熟了，不推荐自己写

## Hot Module Replacement，热模块替换

- 不重新加载整个页面，只更新部分修改了的内容
```js
// webpack.config.js
devServer: {
  contentBase: './dist',
  open: true,
  hot: true,
  // 当HMR失效的时候也不重新加载整个页面
  hotOnly: true
},
plugins: [
  new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new CleanWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin()
],
```

## Babel处理ES6语法

- 不仅进行语法转换，还要进行API进行转换

- 为了不让webpack变得更复杂，可以新建`.babelrc`文件，写babel的配置选项。

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}
// babelrc
{
  "presets": [["@babel/preset-env", {
    // 并只包含所需的polyfills
    "useBuiltIns": "usage",
    "corejs": 2,
    "targets": {
      "edge": "17",
      "firefox": "60",
      "chrome": "67",
      "safari": "11.1"
    },
  }]]
}
```

# Tree Shaking

- 减少不需要的代码，只加载那些真正用到的代码.

- `tree shaking`只支持ES Module（静态引入）

- 在package.json文件中写入选项`sideEffects`，让那些不需要用到tree shaking功能的模块能正常加载

- 在生产模式下，不需要设置tree shaking，webpack已经为我们做好了。但package.json中还是需要写入`sideEffects`
```js
// webpack.config.js，如果是生产环境下，则不需要用到
optimization: {
  usedExports: true
},
// package.json
"sideEffects": [
  "*.css"
],
```

## Development 和Production模式

### 差异

1. SourceMap更小
2. 压缩代码

### 不同环境的解决方案

- 写入不同的config，新建build目录，作为webpack构建的配置文件夹，需要对package.json进行修改config文件的目录。

```js
// webpack.dev.js
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    // hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)

// webpack.prod.js
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

// webpack.common.js，存放开发模式和生产模式的共同配置

```

## Code Splitting，代码拆分

- 对公共代码进行代码拆分，如果不使用代码拆分，当页面逻辑发生变化时，又要重新加载公共代码。当使用了代码拆分，只要加载变化的代码文件即可。
```js
// index.js
import _ from 'lodash';
// 业务逻辑

// config
optimization: {
  splitChunks: {
    chunks: 'all'
  }
},
```

### SplitChunksPlugin插件的其他选项

```js
optimization: {
  splitChunks: {
    chunks: 'all',
    // 30kb
    minSize: 30000,
    minChunk: 1,
    // 缓存组，同步代码的时候会生效,分割代码会放到一起
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        // 值越大就放到改组
        priority: -10,
      },
      default: {
        priority: -20,
        // 检测模块是否已经被打包过了
        reuseExistingChunk: true
      }
    }
  }
},
```
- 事实上，同步加载的代码优化作用并不大，只有使用懒加载才能做到真正的性能优化。

## Lazy Loading 懒加载

- 需要配合异步加载模块使用，同步加载模块无法实现

- 实际上并不是webpack的内容，而是ES Module的一种模块懒加载方案

- 需要用到`@babel/plugin-syntax-dynamic-import`模块
```js
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName: "lodash" */'lodash');
  const element = document.createElement('div');
  element.innerHTML = _.join(['Lazy', 'Loading'], '--');
  return element;
}
docuemnt.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
```


## Chunk是什么

![](https://image-static.segmentfault.com/795/425/79542560-5cf6ee7a827d4_articlex)

- 每一个文件就是一个chunk

## Prefetch和preload 模块

- prefetch，页面加载完毕后，再去加载那些交互性的代码(也就是那些对页面加载没影响的代码)。

- 配合懒加载（异步加载），可以提高代码使用率。

- 前端性能，多考虑代码使用率
```js
/* webpackPrefetch: true */
```

## CSS文件代码分割

- 主要用于生产环境下进行CSS代码分离，需要下载插件`mini-css-extract-plugin`
- 压缩CSS：`optimize-css-assets-webpack-plugin`
-
```js
plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
],
// 将style-loader换成MiniCssExtractPlugin.loader
rules: [{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader']
}, {
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: true
      }
    },
    'less-loader',
    'postcss-loader'
  ]
}]
```

## 浏览器缓存

- `performance: false`，设置性能问题不需要警告。

- 用户通过普通刷新（F5，不是强制刷新）页面，但文件名还是不变，那么请求文件就不会使用新的文件，只会使用缓存文件。

- `[contenthash]`根据内容而生成的hash值，如果content不变，则hash不变。

```js
// prod config
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js'
}
```
