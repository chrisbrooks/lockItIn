/* eslint-disable import/default */

/*import './styles/styles.less';
import './favicon.ico';*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

//import { environment, raygunIsEnabled, raygunApiKey } from '../config';


const store = configureStore();

/*if (raygunIsEnabled) {
    /!* global Raygun *!/
    require('raygun4js');
    Raygun
        .init(raygunApiKey, {
            ignoreAjaxAbort: true
        })
        .setVersion(version)
        .attach()
        .withTags([
            `environment:${environment}`,
            'client'
        ]);
}*/

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>, document.getElementById('app')
);
