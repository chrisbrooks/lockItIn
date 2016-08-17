import * as types from './../actionTypes';

export function setUrlQuery(query) {
    return { type: types.URL_QUERY, payload: query };
}
