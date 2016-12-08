import * as types from '../actionTypes';

export function setCandidateDetails(query) {
    return { type: types.CANDIDATE_DETAILS, payload: query };
}
