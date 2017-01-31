var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');

var basePath =  __dirname + "/";
var staticPath = basePath + '/src/';
var nodeModulesDir = path.join(basePath, 'node_modules');

var config = {
    context: staticPath,
    
    profile: true,

    entry: {
        common: 'app/common',
        home: 'app/home'
    },

    output: {
        path: staticPath + 'js/build/development',
        publicPath: "/src/js/build/development/",
        filename: '[name].js',
        chunkFilename: '[id].js'
    },

    plugins: [
        new CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js',
            minChunks: 2,
            chunks: [
                'common',
                'home'
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],

    resolve: {
        extensions: ["", ".js"],
        modulesDirectories: [
            "node_modules",
            staticPath + "js",
            staticPath + "js/libs",
            staticPath + "js/app"
        ],

        alias: {}
    },

    resolveLoader: {
        modulesDirectories: [
            nodeModulesDir
        ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /(node_modules)/,
                query: {
                    optional: ["runtime", "es7.decorators", "es7.classProperties"],
                    cacheDirectory: true
                }
            }
        ],

        noParse: [],
    }
};

module.exports = config;
