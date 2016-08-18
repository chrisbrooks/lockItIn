import { expect } from 'chai';
import sinon from 'sinon';
import * as payment from './paymentActions';
import * as types from '../actionTypes';
import * as constants from '../../constants';
import axios from 'axios';
import stripeMock from '../../mocks/stripe/configureStripe'; // eslint-disable-line

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
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_FRAUDULENT payment error message', () => {
        const value = constants.errors.DECLINED_FRAUDULENT;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED_FRAUDULENT,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_EXPIRED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED_EXPIRED,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_INCORRECT_CVC;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED_INCORRECT_CVC,
        } };
        expect(payment.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.INVALID_AMOUNT;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED,
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


    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.INVALID_TOKEN;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.DECLINED,
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

describe('createStripeToken', () => {

    const country = "Australia";
    const email = "chris@gmail.com";
    const prn = "etwrt346ertr";
    const cardNumber = "4747 4747 4747 4747";
    const cvv = "111";
    const expiry = "10/18";
    const totalAmount = 500;
    const customerNumber = '3efsrge45drg';

    const stripeData = {
        number: cardNumber,
        cvc: cvv,
        exp: expiry,
        amount: totalAmount,
    };

    const paymentData = {
        prn,
        email,
        country,
        amount: totalAmount * 100,
        token: 'token',
        customernumber: customerNumber,
    };

    const dispatch = sinon.spy();
    sinon.spy(stripeMock, 'createToken');

    /*eslint-disable */
    beforeEach(function () {
        sinon.spy(axios, 'post');
    });

    afterEach(function () {
        axios.post.restore();
    });
    /*eslint-enable */

    it('should set the correct actions', () => {

        const actionMethod = payment.createStripeToken(country, email, prn, cardNumber, cvv, expiry, totalAmount, customerNumber);

        actionMethod(dispatch);

        expect(stripeMock.createToken.called).to.equal(true);
        expect(stripeMock.createToken.calledWith(stripeData)).to.equal(true);

        expect(axios.post.called).to.equal(true);
        expect(axios.post.calledWith('http://localhost:2626/token/charge', paymentData)).to.equal(true);
        expect(dispatch.called).to.equal(true);

        expect(dispatch.calledWith({ type: types.LOADING, payload: true })).to.equal(true);

    });
});
