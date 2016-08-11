import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Jackhackattack don't know why this is neeeded but it is... 
const env = process.env.NODE_ENV || 'production'

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: false,
};

const srcPaths = [
    path.resolve(__dirname, './app'),
];

export default {
    debug: false,

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
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),

        // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),

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
                loader: 'file?name=fonts/[name].[ext]',
            },
            {
                test: /\.(woff|woff2)$/,
                include: srcPaths,
                loader: 'file-loader?name=fonts/[name].[ext]&prefix=font/&limit=5000',
            },
            {
                test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                include: srcPaths,
                loader: 'file-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                include: srcPaths,
                loader: 'file-loader?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml',
            },
            { test: /\.(jpe?g|png|gif)$/i, include: srcPaths, loaders: ['file?name=images/[name].[ext]'] },
            { test: /\.ico$/, include: srcPaths, loader: 'file-loader?name=images/[name].[ext]' },
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
