module.exports = function (wallaby) {

    process.env.NODE_ENV = 'test';

    return {

        files: [
            {pattern: 'app/**/*.less', instrument: false },
            {pattern: 'config.js', instrument: false },
            {pattern: 'config.dev.js', instrument: false },
            {pattern: 'config.prod.js', instrument: false },
            'app/**/*.js',
            '!app/**/*.test.js',
        ],

        tests: [
            'app/**/*.test.js'
        ],

        compilers: {
            '**/*.js*': wallaby.compilers.babel()
        },

        testFramework: 'mocha',

        env: {
            type: 'node'
        },

        setup: function() {
            ['.css', '.less', '.png', '.jpg'].forEach(ext => {
                require.extensions[ext] = () => null;
            });
            require("babel-register")();
        }
    };
};
