import {
    CARD_NUMBER_UPDATED,
    EXPIRY_UPDATED,
    CVV_UPDATED,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function reducer(state = initialState.card, action) {
    switch (action.type) {

        case CARD_NUMBER_UPDATED: {
            const cardNumber = action.payload;
            return { ...state, cardNumber };
        }

        case EXPIRY_UPDATED: {
            const expiry = action.payload;
            return { ...state, expiry };
        }

        case CVV_UPDATED: {
            const cvv = action.payload;
            return { ...state, cvv };
        }

        default: {
            return state;
        }
    }
}
