import { PAYMENT_SUCCESS, STORE_QUERY } from '../actions/actionTypes';
import initialState from './initialState';

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {

    case STORE_QUERY:
        const customerNumber = action.payload.customernumber;
        const invoiceNumber = action.payload.invoicenumber;
        const amount = action.payload.amount;

        return { ...state, customerNumber, invoiceNumber, amount };
    default:
        return state;
    }
}
