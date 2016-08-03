import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import * as payment from '../paymentActions';
import * as types from '../actionTypes';
import * as constants from '../../constants';
import Stripe from '../../stripe/configureStripe';
import axios from 'axios';

describe('payment loading actions', () => {
    it('should set loading action to true', () => {
        const value = true;
        const expectedAction = { type: types.LOADING, payload: value };
        expect(payment.loading(value)).to.eql(expectedAction);
    });
});

describe('payment success actions', () => {
    it('should set payment success action to true', () => {
        const value = false;
        const expectedAction = { type: types.PAYMENT_SUCCESS, payload: value };
        expect(payment.paymentSuccess(value)).to.eql(expectedAction);
    });
});

describe('payment error actions', () => {

    it('should set the DECLINED payment error message', () => {
        const value = constants.errors.DECLINED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: { paymentError: true, paymentErrorMessage: constants.errorMessages.DECLINED } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_FRAUDULENT payment error message', () => {
        const value = constants.errors.DECLINED_FRAUDULENT;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: { paymentError: true, paymentErrorMessage: constants.errorMessages.DECLINED } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_FRAUDULENT payment error message', () => {
        const value = constants.errors.DECLINED_INCORRECT_NUMBER;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.NUMBER_INCORRECT,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_INCORRECT_CVC;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.CVC_INCORRECT,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_EXPIRED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.CARD_EXPIRED,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.UNSUPPORTED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.UNSUPPORTED,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DEFAULT payment error message', () => {
        const value = '';
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.PROCESSING_ERROR,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });
});

describe('createStripToken', () => {

    it('should set the correct actions', () => {

        const value = {
            prn: 'rtghfasrfeatg',
            email: 'chris@gmail.com',
            country: 'Australia',
            cardNumber: '4747 4747 4747 4747',
            expiry: '10/18',
            cvv: '111',
            totalAmount: 550,
        };

        payment.createStripeToken(value);


    });

});
