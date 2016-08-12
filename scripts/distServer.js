/* eslint-disable import/default */

// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';

// Run Browsersync
browserSync({
    port: 8080,
    ui: {
        port: 3001,
    },
    server: {
        baseDir: 'dist',
    },
});
