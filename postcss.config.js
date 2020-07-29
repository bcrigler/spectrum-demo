const autoprefixer = require('autoprefixer');
const postcssimport = require('postcss-import');
const path = require('path');
const url = require("postcss-url");
const urlOptions = {
    url: 'rebase',
    basePath: path.resolve(__dirname, 'dist'),
    assetsPath: '.'
};
const postcsssimplevars = require('postcss-simple-vars');
const postcssextend = require('postcss-extend');
const postcssnested = require('postcss-nested');
const postcssmixins = require('postcss-mixins');
const cssnano = require('cssnano');

module.exports = {
    root: '/',
    plugins: [
        autoprefixer,
        postcssimport,
        url(urlOptions),
        postcsssimplevars,
        postcssextend,
        postcssnested,
        postcssmixins,
        cssnano({
            normalizeUrl: true
        })
    ]
};
