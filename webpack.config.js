const mergePlugin = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

module.exports = (env, argv) => {
    switch(argv.NODE_ENV) {
        // merges our common settings with our development build settings.
        case 'development':
            return mergePlugin.merge(devConfig, commonConfig);
        // merges our common settings with our production build settings.
        case 'production':
            return mergePlugin.merge(prodConfig, commonConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
}