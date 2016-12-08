// This file merely configures the store for hot reloading.
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as getCandidateDetails from '../actions/getCandidateActions/getCandidateActions';
import * as countryActions from '../actions/countryActions/countryActions';
import { getLocation } from '../helpers/getLocation/getLocation';
import { getCandidatesUrl } from '../../config.js'; // eslint-disable-line

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

    const blah = {
        "data" :{
            "Items":[
                {
                    "responseStatus":"notSent",
                    "candidatePhNo":"0481122997",
                    "postionName":"Barista",
                    "candidateName":"Jack Jordon",
                    "candidateCurrentRole":"front-end developer",
                    "sendReminder":"no",
                    "interviewId":"07c1bffc-167ww6-4863-aabf-b5504712497f",
                    "interviewOrTrial":"interview",
                    "advertiserCompany":"Seek",
                    "advertiserName":"SEEK",
                    "candidateEmail": "chrisbrooks1986@gmail.com"
                },
                {
                    "responseStatus":"noResponse",
                    "candidatePhNo":"1",
                    "postionName":"Barista",
                    "candidateName":"Jack J",
                    "candidateCurrentRole":null,
                    "sendReminder":"no",
                    "interviewId":"07c1bffc-167wwww6-4863-aabf-b5504712497f",
                    "interviewOrTrial":"interview",
                    "advertiserCompany":"Seek",
                    "advertiserName":"SEEK",
                    "candidateEmail":null
                },
                {
                    "responseStatus":"declined",
                    "candidatePhNo":"1",
                    "postionName":"Barista",
                    "candidateName":"Jack J",
                    "candidateCurrentRole":null,
                    "sendReminder":"no",
                    "interviewId":"07c1bffc-167wwww6-48ss63-aabf-b550471f2497f",
                    "interviewOrTrial":"interview",
                    "advertiserCompany":"Seek",
                    "advertiserName":"SEEK",
                    "candidateEmail":null
                },
                {
                    "responseStatus":"accepted",
                    "candidatePhNo":"1",
                    "postionName":"Barista",
                    "candidateName":"Jack J",
                    "candidateCurrentRole":null,
                    "sendReminder":"no",
                    "interviewId":"07c1bffc-167wwww6-48ss63-aabf-b5504712497f",
                    "interviewOrTrial":"interview",
                    "advertiserCompany":"Seek",
                    "advertiserName":"SEEK",
                    "candidateEmail":null
                }
            ],
            "Count":2,
            "ScannedCount":2
        }
    };

    store.dispatch(getCandidateDetails.setCandidateDetails(blah.data.Items));

    //axios.get(`${getCandidatesUrl}`).then(response => {
      //  store.dispatch(getCandidateDetails.setCandidateDetails(response.data.Items));
    //});

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
