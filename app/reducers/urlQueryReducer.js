import {
    URL_QUERY,
} from '../actions/actionTypes';

import initialState from './initialState';

export default function reducer(state = initialState.urlQuery, action) {
    switch (action.type) {

        case URL_QUERY: {
            const customerNumber = action.payload.customernumber;
            const invoiceNumber = action.payload.invoicenumber;
            const amount = action.payload.amount;
            const prn = action.payload.prn;
            const email = action.payload.email;
            return { ...state, customerNumber, invoiceNumber, amount, prn, email };
        }

        default: {
            return state;
        }
    }
}
