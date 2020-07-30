const webpack = require('webpack');
const url = require("postcss-url");
const path = require('path');
const context = path.resolve(__dirname, 'src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                        // this section I didn't finish but it would load files based on public paths.
                        // I didn't need it for this demo.
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
            path.resolve(__dirname + '/src/services'),
            path.resolve(__dirname + '/src/context'),
            path.resolve(__dirname + '/src/data'),
            path.resolve(__dirname + '/node_modules'),
            path.resolve(__dirname + '/assets')
        ]
    }
};
