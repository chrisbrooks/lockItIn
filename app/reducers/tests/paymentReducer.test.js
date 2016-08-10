import { expect } from 'chai';
import reducer from '../paymentReducer';
import initialState from '../initialState';
import {
    LOADING,
    PAYMENT_SUCCESS,
    PAYMENT_ERROR,
} from '../../actions/actionTypes';

describe('payment reducer', () => {

    const state = initialState.payment;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            loading: false,
            paymentSuccess: false,
            paymentError: false,
            paymentErrorMessage: '',
        });
    });

    it('should return the correct loading state', () => {
        const loading = true;
        expect(reducer((state), {
            type: LOADING,
            payload: loading,
        })
        ).to.eql({ loading: true,
            paymentSuccess: false,
            paymentError: false,
            paymentErrorMessage: '',
        });
    });

    it('should return the correct payment success state', () => {
        const paymentSuccess = true;
        expect(reducer((state), {
            type: PAYMENT_SUCCESS,
            payload: paymentSuccess,
        })
        ).to.eql({
            loading: false,
            paymentSuccess: true,
            paymentError: false,
            paymentErrorMessage: '',
        });
    });

    it('should return the correct error state', () => {
        const paymentError = { paymentError: true, paymentErrorMessage: 'this is a payment error message' };
        expect(reducer((state), {
            type: PAYMENT_ERROR,
            payload: paymentError,
        })).to.eql({
            loading: false,
            paymentSuccess: false,
            paymentError: true,
            paymentErrorMessage: 'this is a payment error message',
        });
    });

});
