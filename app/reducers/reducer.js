import {
    CURRENCY,
    LOADING,
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

export default function reducer(state = initialState.actions, action) {
    switch (action.type) {

        case CURRENCY: {
            const currency = action.payload;
            return { ...state, currency };
        }

        case LOADING: {
            const loading = action.payload;
            return { ...state, loading };
        }

        case PAYMENT_SUCCESS: {
            const paymentSuccess = action.payload;
            return { ...state, paymentSuccess };
        }

        case PAYMENT_ERROR: {
            const paymentError = action.payload.paymentError;
            const paymentErrorMessage = action.payload.paymentErrorMessage;
            return { ...state, paymentError, paymentErrorMessage };
        }

        case URL_QUERY: {
            const customerNumber = action.payload.customernumber;
            const invoiceNumber = action.payload.invoicenumber;
            const amount = action.payload.amount;
            const prn = action.payload.prn;
            const email = action.payload.email;

            return { ...state, customerNumber, invoiceNumber, amount, prn, email };
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
