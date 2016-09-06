import {
    LOCATION,
} from '../../actions/actionTypes';

import initialState from './../initialState';

export default function reducer(state = initialState.country, action) {
    switch (action.type) {

        case LOCATION: {
            const country = action.payload;
            return { ...state, country };
        }

        default: {
            return state;
        }
    }
}
