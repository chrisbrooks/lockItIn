import { expect } from 'chai';
import * as validationActions from '../paymentActions';
import * as types from '../actionTypes';
import * as constants from '../../constants';

describe('payment loading actions', () => {
    it('should set loading action to true', () => {
        const value = true;
        const expectedAction = {type: types.LOADING, payload: value};
        expect(validationActions.loading(value)).to.eql(expectedAction);
    });
});

describe('payment success actions', () => {
    it('should set payment success action to true', () => {
        const value = false;
        const expectedAction = {type: types.PAYMENT_SUCCESS, payload: value};
        expect(validationActions.paymentSuccess(value)).to.eql(expectedAction);
    });
});

describe('payment error actions', () => {

    it('should set the DECLINED payment error message', () => {
        const value = constants.errors.DECLINED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: { paymentError: true, paymentErrorMessage: constants.errorMessages.DECLINED } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_FRAUDULENT payment error message', () => {
        const value = constants.errors.DECLINED_FRAUDULENT;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: { paymentError: true, paymentErrorMessage: constants.errorMessages.DECLINED } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_FRAUDULENT payment error message', () => {
        const value = constants.errors.DECLINED_INCORRECT_NUMBER;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.NUMBER_INCORRECT,
        } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_INCORRECT_CVC;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.CVC_INCORRECT,
        } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.DECLINED_EXPIRED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.CARD_EXPIRED,
        } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DECLINED_INCORRECT_CVC payment error message', () => {
        const value = constants.errors.UNSUPPORTED;
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.UNSUPPORTED,
        } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });

    it('should set the DEFAULT payment error message', () => {
        const value = '';
        const expectedAction = { type: types.PAYMENT_ERROR, payload: {
            paymentError: true,
            paymentErrorMessage: constants.errorMessages.PROCESSING_ERROR,
        } };
        expect(validationActions.paymentError(value)).to.eql(expectedAction);
    });
});


