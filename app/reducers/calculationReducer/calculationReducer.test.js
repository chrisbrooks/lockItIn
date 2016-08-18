import { expect } from 'chai';
import reducer from './calculationReducer';
import initialState from '../initialState';
import {
    TOTAL_AMOUNT,
    SURCHARGE_UPDATED,
    TOGGLE,
} from '../../actions/actionTypes';

describe('main default reducer', () => {

    const state = initialState.actions;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            surcharge: 0,
            cardType: '',
            complete: false,
            totalAmount: null,
        });
    });

    it('should return the correct total amount state', () => {
        const totalAmount = 400;
        expect(reducer((state), {
            type: TOTAL_AMOUNT,
            payload: totalAmount,
        })).to.eql({
            surcharge: 0,
            cardType: '',
            complete: false,
            totalAmount: 400,
        });
    });

    it('should return the correct card number validation state', () => {
        const actions = {
            surcharge: 3.3,
            cardType: 'Amex',
        };
        expect(reducer((state), {
            type: SURCHARGE_UPDATED,
            payload: actions,
        })).to.eql({
            surcharge: 3.3,
            cardType: 'Amex',
            complete: false,
            totalAmount: null,
        });
    });
});
