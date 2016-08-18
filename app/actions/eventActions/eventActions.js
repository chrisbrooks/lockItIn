import * as types from '../actionTypes';

export function setToggle(result) {
    return { type: types.TOGGLE, payload: result };
}
