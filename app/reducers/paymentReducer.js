import { PAYMENT_SUCCESS, STORE_QUERY, SURCHARGE_UPDATED, CARD_NUMBER_UPDATED, EXPIRY_UPDATED, CVV_UPDATED } from '../actions/actionTypes';
import initialState from './initialState';

export default function paymentReducer(state = initialState.payment, action) {
    switch (action.type) {

    case STORE_QUERY:
        const customerNumber = action.payload.customernumber;
        const invoiceNumber = action.payload.invoicenumber;
        const amount = action.payload.amount;

        return { ...state, customerNumber, invoiceNumber, amount };

        case SURCHARGE_UPDATED:
            const surcharge = action.payload.surcharge;
            const cardType = action.payload.cardType;

            return { ...state, surcharge, cardType};

        case CARD_NUMBER_UPDATED:
            const cardNumber = action.payload;

            return {...state, cardNumber};

        case EXPIRY_UPDATED:
            const expiry = action.payload;

            return {...state, expiry};

        case CVV_UPDATED:
            const cvv = action.payload;

            return {...state, cvv};

        default:
        return state;
    }

}
