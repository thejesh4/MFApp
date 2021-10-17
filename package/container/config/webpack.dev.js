const { merge } = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const MFPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('../package.json');

console.log(packageJSON);
console.log(packageJSON.dependencies);

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new MFPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remote-marketing-app.js'
            },
            shared: packageJSON.dependencies
        }),
        new HTMLPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig)
