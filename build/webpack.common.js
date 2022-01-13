const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader-plugin');
const miniSVGDataURI = require("mini-svg-data-uri");
module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    resolve: {
        extensions: ['', '.js', '.vue', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: 2
                            }]
                        ],
                        /*第一种 使用动态import的语法需要先安装babel-plugin-dynamic-import-webpack，并且在plugins里面配置这个dynamic-import-webpack */
                        /*第一种 使用动态import的语法需要先安装、npm install --save-dev @babel/plugin-syntax-dynamic-import，并且在plugins里面配置这个@babel/plugin-syntax-dynamic-import */
                        plugins: ["dynamic-import-webpack", ["@babel/plugin-transform-runtime", {// 不污染全局，在运行时加载
                            "absoluteRuntime": false,
                            "corejs": false,
                            "helpers": true,
                            "regenerator": true,
                            "useESModules": false
                        }]]
                    }
                }
            },
            {
                test: /\.vue$/i,
                use: {
                    loader: 'vue-loader'
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
            template: './src/index.html'
        }),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    }
}
