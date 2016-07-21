import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as constants from '../constants';
import * as types from './actionTypes';
import axios from 'axios';

export function setCurrency(value) {
    return { type: types.CURRENCY, payload: value };
}

export function loading(value) {
    return { type: types.LOADING, payload: value };
}

export function paymentSuccess(value) {
    return { type: types.PAYMENT_SUCCESS, payload: value };
}

export function paymentError(error) {
    return { type: types.PAYMENT_ERROR, payload: error };
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

export function createToken(currency, email, prn, cardNumber, cvv, expiry, totalAmount) {
    return dispatch => {

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: totalAmount
        };

        const {paymentUrl} = require('webpack-config-loader!../../config.js');

        Stripe.createToken(stripeData, function (status, response) {
            console.log( status, response );

            dispatch(loading(true));

            if (status === 200) {

                const paymentData = {
                    prn: prn,
                    email: email,
                    currency: currency,
                    amount: totalAmount,
                    token: response.id,
                };

                axios.post(paymentUrl, paymentData).then(function(result) {

                    if (status === 200) {
                        dispatch(paymentSuccess(true));

                    } else {
                        onPaymentError(result.responseJSON.Message);
                    }

                    dispatch(loading(false));
                });

            } else {
                onPaymentError();
                dispatch(loading(false));
            }
        });

        function onPaymentError(errorType) {

            const nonFatal = (errorText) => {
                dispatch(paymentError({ 'paymentError': true, 'paymentErrorMessage': errorText }));
            };

            switch (errorType) {

                case constants.errors.DECLINED: {
                    nonFatal(constants.errorMessages.DECLINED);
                    break;
                }

                case constants.errors.DECLINED_FRAUDULENT: {
                    nonFatal(constants.errorMessages.DECLINED);
                    break;
                }

                case constants.errors.DECLINED_INCORRECT_NUMBER: {
                    nonFatal(constants.errorMessages.NUMBER_INCORRECT);
                    break;
                }

                case constants.errors.DECLINED_INCORRECT_CVC: {
                    nonFatal(constants.errorMessages.CVC_INCORRECT);
                    break;
                }

                case constants.errors.DECLINED_EXPIRED: {
                    nonFatal(constants.errorMessages.CARD_EXPIRED);
                    break;
                }

                case constants.errors.UNSUPPORTED: {
                    nonFatal(constants.errorMessages.UNSUPPORTED);
                    break;
                }

                case constants.errors.INVALID_AMOUNT: {
                    break;
                }

                case constants.errors.INVALID_CUSTOMER: {
                    break;
                }

                case constants.errors.INVALID_TOKEN: {
                    break;
                }

                case constants.errors.TOKENISATION_FAILURE: {
                    break;
                }

                default: {
                    nonFatal(constants.errorMessages.PROCESSING_ERROR);
                    break;
                }
            }
        }
    };
}
