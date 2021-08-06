
const Path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            'src': Path.resolve(__dirname, '../src'),
            'public': Path.resolve(__dirname, '../public'),
        },
        extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
        enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader?sourceMap=true', 'postcss-loader', 'sass-loader'],
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
        }, {
            test: /\.html$/i,
            loader: 'html-loader',
        }]
    },
    devServer: {
        // 静态资源访问目录
        contentBase: [Path.join(__dirname, 'public'), Path.join(__dirname, 'assets')],
        port: 3000,
        inline: true,
        hot: true,
        // 解决开发阶段跨域请求问题最好的办法
        // proxy: {
        //     '/api': {
        //         target: 'https://xxxxxxxx',
        //         pathRewrite: {
        //             '^/api': '' //替换代理
        //         }
        //     }
        // }
    },
    plugins: [
    ]
}

module.exports = merge(commonConfig, devConfig);