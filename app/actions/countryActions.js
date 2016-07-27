import * as types from './actionTypes';

export function setLocation(value) {
    return { type: types.LOCATION, payload: value };
}
