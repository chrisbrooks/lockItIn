import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import PaymentApi from '../api/paymentApi';

export function storeQuery(query) {
    return { type: types.STORE_QUERY, payload: query };
}

export function setSurcharge(value) {
    return { type: types.SURCHARGE_UPDATED, payload: value };
}

export function createToken(cardNumber, cvv, expiry) {
    const stripeData = {
        number: cardNumber,
        cvc: cvv,
        exp: expiry,
    }

    Stripe.createToken(stripeData, function (status, response) {
        console.log( status, response );

    });
}
