import * as types from '../actionTypes';

export function setTotalAmount(value) {
    return { type: types.TOTAL_AMOUNT, payload: value };
}

export function setSurcharge(value) {
    return { type: types.SURCHARGE_UPDATED, payload: value };
}
