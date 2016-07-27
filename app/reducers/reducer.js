import {
    TOTAL_AMOUNT,
    SURCHARGE_UPDATED,
    TOGGLE,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function reducer(state = initialState.actions, action) {
    switch (action.type) {

        case TOTAL_AMOUNT: {
            const totalAmount = action.payload;
            return { ...state, totalAmount };
        }

        case SURCHARGE_UPDATED: {
            const surcharge = action.payload.surcharge;
            const cardType = action.payload.cardType;
            return { ...state, surcharge, cardType };
        }

        case TOGGLE: {
            const toggle = action.payload;
            return { ...state, toggle };
        }

        default: {
            return state;
        }
    }
}
