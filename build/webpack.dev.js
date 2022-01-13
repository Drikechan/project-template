const {
    merge
} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { initRunIcon } = require('../config/successIcon');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    target: 'web',//启用热更新
    devServer: {
        contentBase: '../dist',
        hot: true,//启用热更新如果使用browserslist就会生效不了
        overlay: true,
        port: 9765,
        quiet: true,
        // hotonly: true,
        // webSocketServer: 'ws',
        // target: 'web'
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
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:9765${initRunIcon()}`],
            },
            clearConsole: true,
        })
    ]
});
