import * as types from '../actionTypes';

export function setCardNumber(value) {
    return { type: types.CARD_NUMBER_UPDATED, payload: value };
}

export function setExpiry(value) {
    return { type: types.EXPIRY_UPDATED, payload: value };
}

export function setCvv(value) {
    return { type: types.CVV_UPDATED, payload: value };
}
