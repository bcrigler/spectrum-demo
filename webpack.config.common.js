const webpack = require('webpack');
const path = require('path');
const context = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cleanOptions = {
    // Absolute path to your webpack root folder (paths appended to this)
    // Default: root of your package
    root: __dirname,

    // Write logs to console.
    verbose: true,

    // Use boolean "true" to test/emulate delete. (will not remove files).
    // Default: false - remove files
    dry: false,

    // If true, remove files on recompile.
    // Default: false
    watch: false,

    // Instead of removing whole path recursively,
    // remove all path's content with exclusion of provided immediate children.
    // Good for not removing shared files from build directories.
    exclude: [ 'favicon.ico', './assets/*.*' ],

    // allow the plugin to clean folders outside of the webpack root.
    // Default: false - don't allow clean folder outside of the webpack root
    allowExternal: false,

    // perform clean just before files are emitted to the output dir
    // Default: false
    beforeEmit: false,
    // clean the dist folder before rebuilding
    cleanPaths: ['dist']
}

module.exports = {
    context,
    entry: context + '/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: [
                            '@babel/transform-react-jsx',
                            [
                                'react-css-modules',
                                {
                                    context: path.resolve(__dirname, 'src'),
                                    webpackHotModuleReloading: true,
                                    handleMissingStyleName: 'throw',
                                    generateScopedName: '[path]-[name]-[local]--[hash:base64:5]'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    }
};