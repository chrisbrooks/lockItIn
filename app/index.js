/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/app'; // eslint-disable-line

const {
    environment,
    raygunIsEnabled,
    raygunApiKey,
} = require('../config.js');

const store = configureStore();


if (raygunIsEnabled) {
    /* global Raygun */
    require('raygun4js');
    Raygun
        .init(raygunApiKey, {
            ignoreAjaxAbort: true,
        })
        // .setVersion(version)
        .attach()
        .withTags([
            `environment:${environment}`,
            'client',
        ]);
}

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app')
);
