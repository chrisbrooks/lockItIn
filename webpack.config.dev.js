import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    __DEV__: true,
};

const srcPaths = [
    path.resolve(__dirname, './app'),
];

export default {
    debug: true,

    // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
    // and https://webpack.github.io/docs/configuration.html#devtool
    // devtool: 'cheap-source-map',

    // set to false to see a list of every file being bundled.
    noInfo: true,
    entry: [
        // Set up an ES6-ish environment
        'babel-polyfill',

        // hot reload
        'webpack-hot-middleware/client?reload=true',

        // Application
        './app/index',
    ],

    // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    target: 'web',
    output: {
        // Note: Physical files are only output by the production build task `npm run build`.
        path: `${__dirname}/dist`,

        // Use absolute paths to avoid the way that URLs are resolved by Chrome
        // when they're parsed from a dynamically loaded CSS blob. Note: Only necessary in Dev.
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js',
    },
    plugins: [
        // Tells React to build in prod mode.
        // https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: srcPaths,
                exclude: /node_modules\/(?!seek-style-guide)/,
                loader: 'babel',
            },
            {
                test: /\.json$/,
                include: srcPaths,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                include: srcPaths,
                loader: 'file',
            },
            {
                test: /\.(woff|woff2)$/,
                include: srcPaths,
                loader: 'file-loader?prefix=font/&limit=5000',
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                include: srcPaths,
                loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                include: srcPaths,
                loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
            },
            { test: /\.(jpe?g|png|gif)$/i, include: srcPaths, loaders: ['file'] },
            { test: /\.ico$/, include: srcPaths, loader: 'file-loader?name=[name].[ext]' },
            {
                test: /\.less$/,
                include: srcPaths,
                exclude: /node_modules\/(?!seek-style-guide)/,
                loader: ExtractTextPlugin.extract('style',
                    'css?localIdentName=[name]__[local]___[hash:base64:7]!postcss!less'),
            },
        ],
    },

    postcss: [
        require('autoprefixer'),
        require('postcss-local-scope'),
    ],

    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
};
