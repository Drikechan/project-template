const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let vendors = [
    [
      "echarts",
      "element-ui",
      "lodash"
    ],
    [
      'vue'
    ]
  ]
  
  module.exports = {
    mode: 'production',
    entry: {
      // 多入口，单入口情况，只需写一个，key值自定义，value值为数组
      applicationPlugin: vendors[0],
      frameworkPlugin: vendors[1]
    },
    output: {
      path: path.join(__dirname, "../static/dll"),
      filename: "[name].[hash].dll.js",
      library: "[name]_[hash]"
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "../dllManifest", "[name]-manifest.json"),
        name: "[name]_[hash]",
        context: __dirname
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false
        }
      }),
    ]
  }
  