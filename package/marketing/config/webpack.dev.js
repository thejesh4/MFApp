const { merge } = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');
const MFPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new MFPlugin({
            name: 'marketing',
            filename: 'remote-marketing-app.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        }),
        new HTMLPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig)
