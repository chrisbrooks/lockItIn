import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env': Object.keys(process.env).reduce(function(o, k) { o[k] = JSON.stringify(process.env[k]); return o; }, {}),
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true,
};

const srcPaths = [
    path.resolve(__dirname, './app'),
    path.resolve(__dirname, './config')
];

const config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './app/index',
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: 'http://localhost:3000/', // Use absolute paths to avoid the way that URLs are resolved by Chrome when they're parsed from a dynamically loaded CSS blob. Note: Only necessary in Dev.
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS), // Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    module: {
        loaders: [
            { test: /\.js$/, include: srcPaths, exclude: /node_modules\/(?!seek-style-guide)/, loader: 'babel' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, include: srcPaths, loader: 'file' },
            { test: /\.(woff|woff2)$/, include: srcPaths, loader: 'file-loader?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+.\d+.\d+)?$/, include: srcPaths, loader: 'file-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+.\d+.\d+)?$/, include: srcPaths, loader: 'file-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(jpe?g|png|gif)$/i, include: srcPaths, loaders: ['file'] },
            { test: /\.ico$/, include: srcPaths, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.less$/, include: srcPaths, loader: ExtractTextPlugin.extract('style',
                'css?' +
                'localIdentName=[name]__[local]___[hash:base64:7]' +
                '!postcss' +
                '!less')
            },
        ]
    },

    postcss: [
        require('autoprefixer'),
        require('postcss-local-scope')
    ],
};

module.exports = config, {
    extractTextPlugin: ExtractTextPlugin
};
