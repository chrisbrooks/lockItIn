import * as constants from '../../constants';
import * as types from '../actionTypes';
import Stripe from '../../mocks/stripe/configureStripe'; // eslint-disable-line
import axios from 'axios';

export function loading(value) {
    return { type: types.LOADING, payload: value };
}

export function paymentSuccess(value) {
    return { type: types.PAYMENT_SUCCESS, payload: value };
}

export function paymentError(error) {

    switch (error) {

        case constants.errors.DECLINED: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED,
                },
            };
        }

        case constants.errors.DECLINED_FRAUDULENT: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED_FRAUDULENT,
                },
            };
        }

        case constants.errors.DECLINED_EXPIRED: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED_EXPIRED,
                },
            };
        }

        case constants.errors.DECLINED_INCORRECT_CVC: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED_INCORRECT_CVC,
                },
            };
        }

        case constants.errors.INVALID_AMOUNT: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED,
                },
            };
        }

        case constants.errors.INVALID_TOKEN: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED,
                },
            };
        }

        case constants.errors.UNSUPPORTED: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.UNSUPPORTED,
                },
            };
        }

        default: {
            return {
                type: types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.PROCESSING_ERROR,
                },
            };
        }
    }
}

export function createStripeToken(country, email, prn, cardNumber, cvv, expiry, totalAmount, customerNumber) {
    return dispatch => {

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: totalAmount,
        };

        const { paymentUrl } = require('../../../config.js');
        const chargeUrl = `${paymentUrl}`;

        /*eslint-disable */
        Stripe.createToken(stripeData, function (status, response) {
        /*eslint-enable */

            dispatch(loading(true));

            if (status === 200) {

                const paymentData = {
                    prn,
                    email,
                    country,
                    amount: totalAmount * 100, //expecting value without decimal
                    token: response.id,
                    customernumber: customerNumber,
                };

                /*eslint-disable */
                axios.post(chargeUrl, paymentData).then(function (status, result) {
                /*eslint-enable */

                    dispatch(paymentSuccess(true));
                    dispatch(loading(false));

                    /*eslint-disable */
                }).catch(function (error) {
                    /*eslint-enable */

                    dispatch(paymentError(error.data));
                    dispatch(loading(false));

                });

            } else {

                dispatch(paymentError(constants.errorMessages.PROCESSING_ERROR));
                dispatch(loading(false));
            }

        });
    };
}
