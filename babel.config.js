const path = require('path');
let presets = [
    '@babel/preset-env',
    '@babel/react'
];
let plugins = [
    ["@babel/plugin-transform-runtime",
    {
        "absoluteRuntime": false,
        "corejs": 2,
        "version": "^7.10.5"
    }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-react-jsx',
    ['react-css-modules', { context: path.resolve(__dirname, 'src') } ]
];


module.exports = function (api) {
    api.cache(false);
    return {
        presets,
        plugins
    };
};
