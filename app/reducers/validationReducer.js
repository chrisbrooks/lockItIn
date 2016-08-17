import {
    CARD_NUMBER_VALID,
    EXPIRY_VALID,
    CVV_VALID,
    URL_QUERY_VALID,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function reducer(state = initialState.validation, action) {
    switch (action.type) {

        case CARD_NUMBER_VALID: {
            const cardNumberValid = action.payload.cardNumberValid;
            const cardNumberTouched = action.payload.cardNumberTouched;
            return { ...state, cardNumberValid, cardNumberTouched };
        }

        case EXPIRY_VALID: {
            const expiryValid = action.payload.expiryValid;
            const expiryTouched = action.payload.expiryTouched;
            return { ...state, expiryValid, expiryTouched };
        }

        case CVV_VALID: {
            const cvvValid = action.payload.cvvValid;
            const cvvTouched = action.payload.cvvTouched;
            return { ...state, cvvValid, cvvTouched };
        }

        case URL_QUERY_VALID: {
            const urlQueryValid = action.payload;
            return { ...state, urlQueryValid };
        }

        default: {
            return state;
        }
    }
}
