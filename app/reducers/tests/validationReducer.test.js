import { expect } from 'chai';
import reducer from '../validationReducer';
import initialState from '../initialState';
import {
    CARD_NUMBER_VALID,
    EXPIRY_VALID,
    CVV_VALID,
} from '../../actions/actionTypes';

describe('validation reducer', () => {

    const state = initialState.validation;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            cardNumberValid: false,
            cardNumberTouched: false,
            expiryValid: false,
            expiryTouched: false,
            cvvValid: false,
            cvvTouched: false,
        });
    });

    it('should return the correct card number validation state', () => {
        const validation = {
            cardNumberValid: true,
            cardNumberTouched: true,
        };
        expect(reducer((state), {
            type: CARD_NUMBER_VALID,
            payload: validation,
        })).to.eql({
            cardNumberValid: true,
            cardNumberTouched: true,
            expiryValid: false,
            expiryTouched: false,
            cvvValid: false,
            cvvTouched: false,
        });
    });

    it('should return the correct expiry number validation state', () => {
        const validation = {
            expiryValid: true,
            expiryTouched: true,
        };
        expect(reducer((state), {
            type: EXPIRY_VALID,
            payload: validation,
        })).to.eql({
            cardNumberValid: false,
            cardNumberTouched: false,
            expiryValid: true,
            expiryTouched: true,
            cvvValid: false,
            cvvTouched: false,
        });
    });

    it('should return the correct cvv validation state', () => {
        const validation = {
            cvvValid: true,
            cvvTouched: true,
        };
        expect(reducer((state), {
            type: CVV_VALID,
            payload: validation,
        })).to.eql({
            cardNumberValid: false,
            cardNumberTouched: false,
            expiryValid: false,
            expiryTouched: false,
            cvvValid: true,
            cvvTouched: true,
        });
    });

});
