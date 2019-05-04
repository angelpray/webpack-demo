const path = require('path');

module.exports = {
  entry: {
    pageOne: './public/pageOne/index.js',
    pageTwo: './public/pageTwo/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  }
};
