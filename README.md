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
  // 浏览器自动打开地址
  open: true
},
// package.json
"scripts": {
  "start": "webpack-dev-server"
}
```

- 自己写一个服务器，因为webpackDevServer已经很成熟了，不推荐自己写

