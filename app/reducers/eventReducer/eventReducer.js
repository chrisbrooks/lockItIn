import {
    TOGGLE,
} from '../../actions/actionTypes';

import initialState from './../initialState';

export default function reducer(state = initialState.event, action) {
    switch (action.type) {

        case TOGGLE: {
            const toggle = action.payload;
            return { ...state, toggle };
        }

        default: {
            return state;
        }
    }
}
