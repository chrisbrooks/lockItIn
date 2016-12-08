import {
    CANDIDATE_DETAILS,
} from '../../actions/actionTypes';

import initialState from './../initialState';

export default function reducer(state = initialState.candidateInfo, action) {
    switch (action.type) {

        case CANDIDATE_DETAILS: {
            const candidateDetails = action.payload;
            return { ...state, candidateDetails };
        }

        default: {
            return state;
        }
    }
}
