const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './src',
    port: 8080,
    hot: true,
    watchFiles: ['src/*.html'],
  },
});
