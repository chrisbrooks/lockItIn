import * as types from './actionTypes';

export function setCardNumberValid(cardValidate) {
    return { type: types.CARD_NUMBER_VALID, payload: cardValidate };
}

export function setExpiryValid(expiryValidate) {
    return { type: types.EXPIRY_VALID, payload: expiryValidate };
}

export function setCvvValid(cvvValidate) {
    return { type: types.CVV_VALID, payload: cvvValidate };
}

export function setUrlQueryValid(queryValid) {
    return { type: types.URL_QUERY_VALID, payload: queryValid };
}
