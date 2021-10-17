const { merge } = require('webpack-merge');
const MFPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new MFPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/remote-marketing-app.js`
            },
            shared: packageJSON.dependenciess
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);
