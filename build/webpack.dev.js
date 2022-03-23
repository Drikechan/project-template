const {
    merge
} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { initRunIcon } = require('../config/successIcon');
const notifier = require('node-notifier');
const WebpackBar = require('webpackbar');

module.exports = merge(common, {
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
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || ''
                });
            },
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:9765${initRunIcon()}`],
            },
        })
    ]
});
