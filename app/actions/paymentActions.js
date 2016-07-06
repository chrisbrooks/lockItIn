import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import PaymentApi from '../api/paymentApi';

export function submitPaymentSuccess(response) {
    return { type: types.PAYMENT_SUCCESS, payload: response };
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function makePayment(payment) {
    const { amount, invoiceNumber } = payment;

    return dispatch => {
        dispatch(beginAjaxCall());

        const data = { amount, invoiceNumber };

        return PaymentApi.submitPayment(data).then(response => {
            dispatch(submitPaymentSuccess(response));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw error;
        });
    };
}
