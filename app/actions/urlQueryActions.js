import * as types from './actionTypes';

export function urlQuery(query) {
    return { type: types.URL_QUERY, payload: query };
}
