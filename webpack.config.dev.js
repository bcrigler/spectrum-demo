const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|json)$/,
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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
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
                            sourceMap: true,
                            modules: false
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'API_URL': JSON.stringify('http://localhost:8080'),
                'ASSET_PATH': JSON.stringify(''),
                'ENVIRONMENT': JSON.stringify('development')
            }
        }),
        new MiniCssExtractPlugin({
            filename: "style[hash].css"
        }),
        // Here we could define any environment constants we need
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            DEBUG: JSON.stringify(process.env.DEBUG),
            API_URL: JSON.stringify(process.env.API_URL), // defines the base API url for the dev env
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, '/src'),
        hot: true,
        historyApiFallback: true,
        allowedHosts: [
            'localhost'
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname + '/components'),
            path.resolve(__dirname + '/data/'),
            path.resolve(__dirname + '/hooks'),
            path.resolve(__dirname + '/services'),
            path.resolve(__dirname + '/node_modules'),
            path.resolve(__dirname + '/assets')
        ]
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.jsx', '.js', '.json'],
    }
};