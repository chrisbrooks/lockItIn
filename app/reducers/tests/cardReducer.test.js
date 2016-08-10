import { expect } from 'chai';
import reducer from '../cardReducer';
import initialState from '../initialState';
import {
    CARD_NUMBER_UPDATED,
    EXPIRY_UPDATED,
    CVV_UPDATED,
} from '../../actions/actionTypes';

describe('card reducer', () => {

    const state = initialState.card;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            cardNumber: null,
            expiry: null,
            cvv: null,
        });
    });

    it('should return the correct cardNumber state', () => {
        const cardNumber = '1111111111';
        expect(reducer((state), {
            type: CARD_NUMBER_UPDATED,
            payload: cardNumber,
        })).to.eql({ cardNumber: '1111111111', expiry: null, cvv: null });
    });

    it('should return the correct expiry state', () => {
        const expiry = '10/11';
        expect(reducer((state), {
            type: EXPIRY_UPDATED,
            payload: expiry,
        })).to.eql({ cardNumber: null, expiry: '10/11', cvv: null });
    });

    it('should return the correct cvv state', () => {
        const cvv = '111';
        expect(reducer((state), {
            type: CVV_UPDATED,
            payload: cvv,
        })).to.eql({ cardNumber: null, expiry: null, cvv: '111' });
    });
});
