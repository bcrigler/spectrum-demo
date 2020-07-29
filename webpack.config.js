const mergePlugin = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

module.exports = (env, argv) => {
    switch(argv.NODE_ENV) {
        case 'development':
            console.log('__dirname' + __dirname);
            return mergePlugin.merge(devConfig, commonConfig);
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // if we had a prod build setup we would do this here.
        case 'production':
            console.log('__dirname' + __dirname);
            return mergePlugin.merge(prodConfig, commonConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
}