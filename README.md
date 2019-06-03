# webpack

- 模块打包工具

## 安装

- 全局安装：不推荐。

- 局部安装：在项目目录中安装`npm i webpack-cli webpack -D`。

- 查看版本：`webpack -v`无法起作用，需要`npx webpack -v`。

- 安装特定webpack版本：`npm i webpack-cli webpack@version -D`。

- webpack-cli作用是在命令行中使用webpack

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
