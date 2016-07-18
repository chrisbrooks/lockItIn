import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as constants from '../constants';
import * as types from './actionTypes';
import axios from 'axios';

const {
    paymentUrl,
    } = require('webpack-config-loader!../../config.js');


export function paymentSuccess(value) {
    return { type: types.PAYMENT_SUCCESS, payload: value };
}

export function paymentError(error) {
    return { type: types.PAYMENT_ERROR, payload: error };
}

export function paymentApiActive(response) {
    return { type: types.PAYMENT_API_ACTIVE, payload: response };
}

export function urlQuery(query) {
    return { type: types.URL_QUERY, payload: query };
}

export function setTotalAmount(value) {
    return { type: types.TOTAL_AMOUNT, payload: value };
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

export function createToken(cardType, cardNumber, cvv, expiry, totalAmount) {
    return dispatch => {

        const expiryParts = expiry.split('/');
        const expiryMonth = expiryParts[0];
        const expiryYear =  expiryParts[1];

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: totalAmount,
        }

        const paymentData = {
            cardType: cardType,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            last4Digits: cvv,
        }

        Stripe.createToken(stripeData, function (status, response) {
            console.log( status, response );

            dispatch(paymentSuccess(true));

            if(status === 200) {

                axios.post(paymentUrl, paymentData).then(function(response){

                    if(status === 200) {
                        dispatch(paymentSuccess(true));

                    } else {
                        onPaymentError(response.responseJSON.Message);
                    }
                });

            } else {
                onPaymentError(constants.errors.TOKENISATION_FAILURE);
            }
        });

        function onPaymentError(errorType){

            let nonFatal = function (errorText) {
                dispatch(paymentError({'paymentError': true, 'paymentErrorMessage' : errorText}));
            };

            switch (errorType) {
                case constants.errors.DECLINED:
                    nonFatal(constants.errorMessages.DECLINED);
                    break;

                case constants.errors.DECLINED_FRAUDULENT:
                    nonFatal(constants.errorMessages.DECLINED);
                    break;

                case constants.errors.DECLINED_INCORRECT_NUMBER:
                    nonFatal(constants.errorMessages.NUMBER_INCORRECT);
                    break;

                case constants.errors.DECLINED_INCORRECT_CVC:
                    nonFatal(constants.errorMessages.CVC_INCORRECT);
                    break;

                case constants.errors.DECLINED_EXPIRED:
                    nonFatal(constants.errorMessages.CARD_EXPIRED);
                    break;

                case constants.errors.UNSUPPORTED:
                    nonFatal(constants.errorMessages.UNSUPPORTED);
                    break;

                case constants.errors.INVALID_AMOUNT:
                    break;

                case constants.errors.INVALID_CUSTOMER:
                    break;

                case constants.errors.INVALID_TOKEN:
                    break;

                case constants.errors.TOKENISATION_FAILURE:
                    break;

                default:
                    nonFatal(constants.errorMessages.PROCESSING_ERROR);
                    break;
            }
        }
    };
}
