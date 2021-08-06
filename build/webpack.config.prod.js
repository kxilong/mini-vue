
const Path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        // 模块只导出被使用的成员:标记书上哪些是枯树枝,枯树叶
        usedExports: true,
        // 尽可能合并每一个模块到一个函数中
        concatenateModules: true,
        // 压缩输出结果:负责把枯树枝,枯树叶摇下来
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsWebpackPlugin(),
        ],

    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }, {
            test: /\.(scss|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                // 以下配置可以放到.babelrc
                // 如果只是业务代码使用以下配置
                // presets: [['@babel/preset-env', {
                //     targets: {
                //         chrome: "67",
                //     },
                //     useBuiltIns: 'usage'
                // }]]
                // 如果书写的是类库或者组件代码就使用下面这个配置，可以有效避免变量全局污染
                // "plugins": [
                //     [
                //       "@babel/plugin-transform-runtime",
                //       {
                //         "corejs": 2,
                //         "helpers": true,
                //         "regenerator": true,
                //         "useESModules": false
                //       }
                //     ]
                //   ]
            }
        }]
    },
    plugins: [
        // 清除原有打包文件  重新生成
        new CleanWebpackPlugin(),
        // 把类文件统一放入项目根目录的public或者static中，希望打包时一并将这个所有的文件复制到输出的目录
        new CopyWebpackPlugin({ patterns: [{ from: Path.resolve(__dirname, '../public'), to: '' }] }),
        new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[hash].css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: false,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);