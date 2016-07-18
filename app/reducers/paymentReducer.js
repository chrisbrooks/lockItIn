import {
    PAYMENT_API_ACTIVE,
    PAYMENT_SUCCESS,
    PAYMENT_ERROR,
    URL_QUERY,
    TOTAL_AMOUNT,
    SURCHARGE_UPDATED,
    CARD_NUMBER_UPDATED,
    EXPIRY_UPDATED,
    CVV_UPDATED,
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

    case PAYMENT_ERROR: {
        const paymentError = action.payload.paymentError;
        const paymentErrorMessage = action.payload.paymentErrorMessage;
        return { ...state, paymentError, paymentErrorMessage };
    }

    case PAYMENT_API_ACTIVE: {
        const paymentApiActive = action.payload;
        return { ...state, paymentApiActive };
    }

    case URL_QUERY: {
        const customerNumber = action.payload.customernumber;
        const invoiceNumber = action.payload.invoicenumber;
        const amount = action.payload.amount;
        const paymentRef = action.payload.prn;

        return { ...state, customerNumber, invoiceNumber, amount, paymentRef };
    }

    case TOTAL_AMOUNT: {
        const totalAmount = action.payload;
        return { ...state, totalAmount };
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

    case TOGGLE: {
        const toggle = action.payload;
        return { ...state, toggle };
    }

    default: {
        return state;
    }
    }
}
