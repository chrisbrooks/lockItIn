// This file merely configures the store for hot reloading.
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import * as urlQueryActions from '../actions/urlQueryActions/urlQueryActions';
import * as countryActions from '../actions/countryActions/countryActions';
import { getUrlParams } from '../helpers/getUrlParams/getUrlParams';
import { getLocation } from '../helpers/getLocation/getLocation';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk),
            // add support for Redux dev tools
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    store.dispatch(urlQueryActions.setUrlQuery(getUrlParams()));
    store.dispatch(countryActions.setLocation(getLocation()));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
