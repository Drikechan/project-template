const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const threadLoader = require('thread-loader');
const resolvePath = (filePath) => path.resolve(__dirname, '..', filePath);
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MANIFEST_LIST = ['applicationPlugin', 'frameworkPlugin']

const WORKER_POLL = {
    workers: 2,//产生worker的数量
    workerParallelJobs: 50,//一个worker进程执行的任务量
    poolTimeout: 2000,//闲置定时删除worker进程
    poolRespawn: false,//允许重新生成一个僵死的 work 池，这个过程会降低整体编译速度
    name: "project-pool"
}

//可以通过预警 worker 池来防止启动 worker 时的高延时。这会启动池内最大数量的 worker 并把指定的模块加载到 node.js 的模块缓存中。
threadLoader.warmup(WORKER_POLL, ['vue-loader', 'babel-loader']);

module.exports = {
    entry: ['@babel/polyfill', './src/main.js'],
    resolve: {
        extensions: ['.vue','.js','.json','scss','css'],
        alias: {
            '@': path.resolve(__dirname, resolvePath('src')),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:[
                  {
                    loader: 'thread-loader',
                    options: WORKER_POLL
                  },
                  'cache-loader',
                  {
                    loader: 'vue-loader',
                  }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                      {
                        loader: 'thread-loader',
                        options: WORKER_POLL
                      },
                      'cache-loader',
                      {
                        loader: "babel-loader",
                        options: {
                        cacheDirectory: true,//当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)

                    }
                }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'image/[name]_[hash].[ext]'
                }
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
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        runtimeChunk: {
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
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'min.js'
                },
            }
        }

    },
    plugins: [
        new VueLoaderPlugin(),
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
        
    ],
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist')
    },
    performance: {
        hints: false,//防止把体积巨大的 bundle存在在项目中，从而影响网页的性能。
    }
}
