var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

  var wallabyPostprocessor = wallabyWebpack({

      module: {
         loaders: [
               {
                   test: /\.js$/,
                   include: './app',
                   exclude: /node_modules\/(?!seek-style-guide)/,
                   loader: 'babel',
               }
         ],
       },
       devtool: 'cheap-module-eval-source-map',
       externals: {
           "react": "React",
           "ExtractTextPlugin": "extract-text-webpack-plugin"
       },
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
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
      {pattern: 'app/**/*.js', load: false},
      {pattern: 'app/**/*.test.js', ignore: true}
    ],

    tests: [
      {pattern: 'app/**/*.test.js', load: false}
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    }
  };
};
