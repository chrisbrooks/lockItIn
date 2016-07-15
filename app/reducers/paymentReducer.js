import {
    PAYMENT_API_ACTIVE,
    PAYMENT_SUCCESS,
    URL_QUERY,
    SURCHARGE_UPDATED,
    CARD_NUMBER_UPDATED,
    EXPIRY_UPDATED,
    CVV_UPDATED,
    FORM_TOUCHED,
    CARD_NUMBER_VALID,
    EXPIRY_VALID,
    CVV_VALID,
    TOGGLE,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function paymentReducer(state = initialState.payment, action) {
    switch (action.type) {

    case PAYMENT_SUCCESS: {
        const paymentSuccess = action.payload;
        return { ...state, paymentSuccess };
    }

    case PAYMENT_API_ACTIVE: {
        const paymentApiActive = action.payload;
        return { ...state, paymentApiActive };
    }

    case URL_QUERY: {
        const customerNumber = action.payload.customernumber;
        const invoiceNumber = action.payload.invoicenumber;
        const amount = action.payload.amount;

        return { ...state, customerNumber, invoiceNumber, amount };
    }

    case SURCHARGE_UPDATED: {
        const surcharge = action.payload.surcharge;
        const cardType = action.payload.cardType;
        return { ...state, surcharge, cardType };
    }

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

    case FORM_TOUCHED: {
        const formTouched = action.payload;
        return { ...state, formTouched };
    }

    case CARD_NUMBER_VALID: {
        const cardNumberValid = action.payload;
        return { ...state, cardNumberValid };
    }

    case EXPIRY_VALID: {
        const expiryValid = action.payload;
        return { ...state, expiryValid };
    }

    case CVV_VALID: {
        const cvvValid = action.payload;
        return { ...state, cvvValid };
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
