const { merge } = require('webpack-merge');
const MFPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new MFPlugin({
            name: "marketing",
            filename: 'remote-marketing-app.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);
