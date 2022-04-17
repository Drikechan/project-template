'use strict'

const path = require('path');
const devEnv = require('./dev.env');

module.exports = {
    dev: {
        assetsSubDirctory: 'static', //除了index.html之外的静态资源要存放的路径
        assetsPublicPath: '/', //代表打包后，index.html里面引用资源的相对地址
        proxyTable:  devEnv.PROXY_REQUEST === false ? {} :{
            '/api': {
              target: 'http://127.0.0.1:7000',
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/'
              }
            }
          },
          host: 'localhost',
          port: 9765,
          autoOpenBrowser: false,
          errorOverlay: true, //支持错误是否能显示在浏览器上
          notifyOnErrors: true, //打开脚手架提供的错误信息
          useEslint: true,
          showEslintErrorsInOverlay: true,
          devtool: 'cheap-module-eval-source-map',
          cacheBusting: true,
          cssSourceMap: true
    },
    build: {
        index: path.resolve(__dirname, `../dist/index.html`),//模板
        assetsRoot: path.resolve(__dirname, `../dist`),//打包后文件存放的路径
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        devtool: 'cheap-module-source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}