import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as getCandidateDetails from '../actions/getCandidateActions/getCandidateActions';
import * as countryActions from '../actions/countryActions/countryActions';
import { getLocation } from '../helpers/getLocation/getLocation';
import { getCandidatesUrl } from '../../config.js'; // eslint-disable-line

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    axios.get(`${getCandidatesUrl}`).then(response => {
        store.dispatch(getCandidateDetails.setCandidateDetails(response.data.Items));
    });

    store.dispatch(countryActions.setLocation(getLocation()));

    return store;
}
