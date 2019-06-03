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
        name: '[name]_[hash].[ext]',
        outputPath: 'images/',
        // 以字节为单位，1024字节=1kb
        limit: 10240
      }
    }
  }]
},

```

### CSS loader

- `style-loader css-loader`，style-loader负载挂载，css-loader负责分析css文件的关系。

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



