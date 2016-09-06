import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import * as urlQueryActions from '../actions/urlQueryActions/urlQueryActions';
import * as countryActions from '../actions/countryActions/countryActions';
import { getUrlParams } from '../helpers/getUrlParams/getUrlParams';
import { getLocation } from '../helpers/getLocation/getLocation';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    store.dispatch(urlQueryActions.setUrlQuery(getUrlParams()));
    store.dispatch(countryActions.setLocation(getLocation()));

    return store;
}
