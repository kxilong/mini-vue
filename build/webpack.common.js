
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index.js',
    output: {
        path: Path.resolve(__dirname, '../dist'),
        // 输出文件名
        filename: 'static/js/[hash:8].js'
    },
    module: {
        rules: [{
            test: /\.ejs$/,
            loader: 'ejs-html-loader',
        }, {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    // placeholders 占位符
                    name: '[path][name].[ext]',
                    outputPath: 'static/images/',
                    // 超过2048字节使用url-loader
                    limit: 2048
                }
            }
        },]
    },
    plugins: [
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/logo.svg'
        }),
    ],
}
