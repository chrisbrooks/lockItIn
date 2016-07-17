import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from './actionTypes';
import axios from 'axios';

const {
    paymentUrl,
    } = require('webpack-config-loader!../../config.js');


export function paymentSuccess(value) {
    return { type: types.PAYMENT_SUCCESS, payload: value };
}

export function paymentApiActive(response) {
    return { type: types.PAYMENT_API_ACTIVE, payload: response };
}

export function urlQuery(query) {
    return { type: types.URL_QUERY, payload: query };
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

export function setFormTouched(active) {
    return { type: types.FORM_TOUCHED, payload: active };
}

export function setCardNumberValid(cardValidate) {
    return { type: types.CARD_NUMBER_VALID, payload: cardValidate };
}

export function setExpiryValid(expiryValidate) {
    return { type: types.EXPIRY_VALID, payload: expiryValidate };
}

export function setCvvValid(cvvValidate) {
    return { type: types.CVV_VALID, payload: cvvValidate };
}

export function setToggle(result) {
    return { type: types.TOGGLE, payload: result };
}

export function setError(error) {
    return { type: types.PAYMENT_ERROR, payload: error };
}

export function createToken(cardType, cardNumber, cvv, expiry, amount) {
    return dispatch => {

        const expiryParts = expiry.split('/');
        const expiryMonth = expiryParts[0];
        const expiryYear =  expiryParts[1];

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: amount,
        }

        const paymentData = {
            cardType: cardType,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            last4Digits: cvv
        }

        Stripe.createToken(stripeData, function (status, response) {
            console.log( status, response );

            if(status === 200) {

                axios.post(paymentUrl, paymentData).then(function(result){

                    console.log(result);

                    if(status === 200) {
                        dispatch(paymentSuccess(true));
                    }
                });

            } else {

                dispatch(setError(response.error));
            }
        });
    };
}
