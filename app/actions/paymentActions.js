import * as constants from '../constants';
import * as types from './actionTypes';
import Stripe from '../stripe/configureStripe';
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
            return { type:
                types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED,
                },
            };
        }

        case constants.errors.DECLINED_FRAUDULENT: {
            return { type:
                types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.DECLINED,
                },
            };
        }

        case constants.errors.DECLINED_INCORRECT_NUMBER: {
            return { type:
                types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.NUMBER_INCORRECT,
                },
            };
        }

        case constants.errors.DECLINED_INCORRECT_CVC: {
            return { type:
                types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.CVC_INCORRECT,
                },
            };
        }

        case constants.errors.DECLINED_EXPIRED: {
            return { type:
                types.PAYMENT_ERROR,
                payload: {
                    paymentError: true,
                    paymentErrorMessage: constants.errorMessages.CARD_EXPIRED,
                },
            };
        }

        case constants.errors.UNSUPPORTED: {
            return { type:
                types.PAYMENT_ERROR,
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

export function createStripeToken(location, email, prn, cardNumber, cvv, expiry, totalAmount) {
    return dispatch => {

        const stripeData = {
            number: cardNumber,
            cvc: cvv,
            exp: expiry,
            amount: totalAmount,
        };

        const { paymentUrl } = require('../../config.js');

        /*eslint-disable */
        Stripe.createToken(stripeData, function (status, response) {
        /*eslint-enable */

            dispatch(loading(true));

            if (status === 200) {


                const paymentData = {
                    prn,
                    email,
                    currency: location,
                    amount: totalAmount,
                    token: response.id,
                };

                /*eslint-disable */
                axios.post(paymentUrl, paymentData).then(function (result) {
                /*eslint-enable */

                    if (status === 200) {
                        dispatch(paymentSuccess(true));

                    } else {
                        dispatch(paymentError(result.responseJSON.Message));
                    }

                    dispatch(loading(false));
                });

            } else {

                dispatch(paymentError(constants.errorMessages.PROCESSING_ERROR));
                dispatch(loading(false));
            }
        });
    };
}
