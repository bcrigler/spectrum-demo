const webpack = require('webpack');
const common = require('./webpack.config.common');
const merge = require('webpack-merge');
const postcss = require("postcss");
const url = require("postcss-url");
const path = require('path');
const context = path.resolve(__dirname, 'src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const cleanOptions = {
//     // Absolute path to your webpack root folder (paths appended to this)
//     // Default: root of your package
//     root: __dirname,
//
//     // Write logs to console.
//     verbose: true,
//
//     // Use boolean "true" to test/emulate delete. (will not remove files).
//     // Default: false - remove files
//     dry: false,
//
//     // If true, remove files on recompile.
//     // Default: false
//     watch: false,
//
//     // Instead of removing whole path recursively,
//     // remove all path's content with exclusion of provided immediate children.
//     // Good for not removing shared files from build directories.
//     exclude: [ 'favicon.ico', 'assets' ],
//
//     // allow the plugin to clean folders outside of the webpack root.
//     // Default: false - don't allow clean folder outside of the webpack root
//     allowExternal: false,
//
//     // perform clean just before files are emitted to the output dir
//     // Default: false
//     beforeEmit: false
// };
//
// const cleanPaths = ['dist'];

module.exports = {
    context,
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    publicPath: (url, resourcePath, context) => {
                        console.log(url);
                        console.log(resourcePath);
                        console.log(context);
                        // `resourcePath` is original absolute path to asset
                        // `context` is directory where stored asset (`rootContext`) or `context` option

                        // To get relative path you can use
                        // const relativePath = path.relative(context, resourcePath);

                        // if (/my-custom-image\.png/.test(resourcePath)) {
                        //     return `other_public_path/${url}`;
                        // }
                        //
                        // if (/images/.test(context)) {
                        //     return `image_output_path/${url}`;
                        // }
                        //
                        // return `public_path/${url}`;
                    },
                }
            },
            {
                test: /\.(css|eot|svg|ttf|woff|jpg|png)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '.'
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-react-jsx']
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                url({
                                    url: 'rebase',
                                    basePath: path.resolve(__dirname, 'dist'),
                                    assetsPath: '.'
                                }),
                                require('postcss-simple-vars'),
                                require('postcss-extend'),
                                require('postcss-nested'),
                                require('postcss-mixins'),
                                require('cssnano')({ normalizeUrl: true })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'inline-cheap-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Spectrum Rewards Demo',
            minify:{
                collapseWhitespace: true
            },
            hash: true,
            template:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style[hash].css"
        }),
        new webpack.DefinePlugin({
            'process.env':{
                'API_URL': JSON.stringify('//localhost:8080'),
                'ASSET_PATH': JSON.stringify('/assets'),
                'ENVIRONMENT': JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin({ patterns: [ './assets/', { from: './assets/', to: './assets/' } ] } ),
        // new CleanWebpackPlugin.CleanWebpackPlugin(cleanPaths, cleanOptions),
        new webpack.DefinePlugin({
            ASSET_PATH:JSON.stringify('/assets'),
            ENVIRONMENT:JSON.stringify('production')
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname + '/src/components'),
            path.resolve(__dirname + '/src/utilities'),
            path.resolve(__dirname + '/src/constants'),
            path.resolve(__dirname + '/src/views'),
            path.resolve(__dirname + '/node_modules'),
            path.resolve(__dirname + '/assets/images')
        ]
    }
};
