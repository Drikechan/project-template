const {
    merge
} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { initRunIcon } = require('../config/successIcon');
const notifier = require('node-notifier');
const WebpackBar = require('webpackbar');
const portfinder = require('portfinder');
const config = require('../config');
const utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MANIFEST_LIST = ['applicationPlugin', 'frameworkPlugin']

const devWebpackConfig = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    target: 'web',//启用热更新
    devServer: {
        contentBase: '../dist',
        hot: true,//启用热更新如果使用browserslist就会生效不了
        overlay: {
            warnings: false,
            errors: true
        },
        port: 9765,
        quiet: true,
        progress: true,
        host: '0.0.0.0',
        compress: true,
        // webSocketServer: 'ws',
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2//表示匹配到样式文件后都会执行下面两个loader
                        }
                    }, 'sass-loader',
                    /* 这边配置postcss-loader有一个比较坑的地方，需要在package.json里面配置一个broswerlist的一个选项，具体见package.json */
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    /* 这边配置postcss-loader有一个比较坑的地方，需要在package.json里面配置一个broswerlist的一个选项，具体见package.json */
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new WebpackBar({
            name: 'B2B Manage-Front End',
            profile: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            inject: true,
            dll: (function () {
                let res = [];
                for (let i = 0; i < MANIFEST_LIST; i++) {
                  const dllName = require(path.resolve(__dirname, `../dllManifest/${MANIFEST_LIST[i]}-manifest.json`)).name.split('_')
                  res.push(`/static/dll/${dllName[0]}.${dllName[1]}.dll.js`)
                }
                return res
              })()
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.HOST || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port;
            devWebpackConfig.devServer.port = port;
            devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`You application is running here http://${devWebpackConfig.devServer.host}:${port}${initRunIcon()}`],
                },
                onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
            }))
            resolve(devWebpackConfig)
        }
    })
})
