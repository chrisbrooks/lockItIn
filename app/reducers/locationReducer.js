import {
    LOCATION,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function reducer(state = initialState.locationActions, action) {
    switch (action.type) {

        case LOCATION: {
            const location = action.payload;
            return { ...state, location };
        }

        default: {
            return state;
        }
    }
}
