const {
    merge
} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: '../dist',
        hot: true,
        overlay: true
        // hotonly: true
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
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
        new webpack.HotModuleReplacementPlugin()
    ]
});