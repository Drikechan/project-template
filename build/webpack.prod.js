const {
    merge
} = require('webpack-merge');
const common = require('./webpack.common.js');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
/* 开启包分析 */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [ MiniCssExtractPlugin.loader, {
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
                use: [MiniCssExtractPlugin.loader,  {
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash:8].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                /* 启用多进程并发运行并设置并发运行次数。 */
                parallel: 4
            }),
        ]
    },
});
