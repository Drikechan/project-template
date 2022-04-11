const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const resolvePath = (filePath) => path.resolve(__dirname, filePath);
console.log(resolvePath('../src'))
module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    resolve: {
        extensions: ['.vue','.js','.json','scss','css'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/i,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,//当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)

                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024000,
                        name: '[name]_[hash].[ext]',
                        outputPath: 'image/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        usedExports: true,
        providedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                /* 启用多进程并发运行并设置并发运行次数。 */
                parallel: 4
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    // reuseExistingChunk: true,
                    filename: '[name].js'
                },
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'min.js'
                },
            }
        }

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    performance: {
        hints: false,//防止把体积巨大的 bundle存在在项目中，从而影响网页的性能。
    }
}
