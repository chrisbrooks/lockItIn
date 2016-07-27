var wallabyWebpack = require('wallaby-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (wallaby) {

  var wallabyPostprocessor = wallabyWebpack({

      devtool: 'cheap-module-eval-source-map',

      externals: {
          "react": "React",
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true
      },

      resolve: {
          extensions: ['', '.js', '.jsx']
      },

      module: {
         loaders: [
               {
                   test: /\.js$/,
                   include: './app',
                   exclude: /node_modules\/(?!seek-style-guide)/,
                   loader: 'babel',
               },
                {
                 test: /\.json$/,
                 include: './app',
                 exclude: /node_modules/,
                 loader: 'babel',
             },
             {
                 test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                 include: './app',
                 loader: 'file',
             },
             {
                 test: /\.(woff|woff2)$/,
                 include: './app',
                 loader: 'file-loader?prefix=font/&limit=5000',
             },
             {
                 test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
                 include: './app',
                 loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
             },
             {
                 test: /\.svg(\?v=\d+.\d+.\d+)?$/,
                 include: './app',
                 loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
             },
             { test: /\.(jpe?g|png|gif)$/i, include: './app', loaders: ['file'] },
             { test: /\.ico$/, include: './app', loader: 'file-loader?name=[name].[ext]' },
             {
                 test: /\.less$/,
                 include: './app',
                 exclude: /node_modules\/(?!seek-style-guide)/,
                 loader: ExtractTextPlugin.extract('style',
                     'css?localIdentName=[name]__[local]___[hash:base64:7]!postcss!less'),
             },
         ],
       },
    }
  );

  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      // {pattern: 'lib/jquery.js', instrument: false},
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false},
      {pattern: 'node_modules/sinon-chai/lib/sinon-chai.js', instrument: false},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      {pattern: './app/**/*.js', load: false},
    {pattern: 'src/**/*.test.js', ignore: true}
    ],

    tests: [
      {pattern: './app/**/*.test.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'mocha',

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.expect = chai.expect;
      window.__moduleBundler.loadTests();
    }
  };
};
