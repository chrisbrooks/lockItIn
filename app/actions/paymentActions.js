import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import axios from 'axios';
const {
    paymentUrl
    } = require('webpack-config-loader!../../config.js');


export function storeQuery(query) {
    return { type: types.STORE_QUERY, payload: query };
}

export function setSurcharge(value) {
    return { type: types.SURCHARGE_UPDATED, payload: value };
}

export function setCardNumber(value) {
    return { type: types.CARD_NUMBER_UPDATED, payload: value };
}

export function setExpiry(value) {
    return { type: types.EXPIRY_UPDATED, payload: value };
}

export function setCvv(value) {
    return { type: types.CVV_UPDATED, payload: value };
}

export function setError(error) {
    return { type: types.PAYMENT_ERROR, payload: error };
}

export function createToken(cardType, cardNumber, cvv, expiry, amount) {
    return dispatch => {

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: amount,
        }

        const expiryParts = expiry.split('/');
        const expiryMonth = expiryParts[0];
        const expiryYear =  expiryParts[1];

        const paymentData = {
            cardType,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            last4Digits: cvv
        }

        Stripe.createToken(stripeData, function (status, response) {
            console.log( status, response );

            if(status === 200) {

                axios.post(paymentUrl, paymentData).then(function(result){
                    console.log(result);
                });
            } else {
                dispatch(setError(response.error));
            }
        });
    };
}
