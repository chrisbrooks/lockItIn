import { expect } from 'chai';
import * as validation from 'validationActions';
import * as types from '../actionTypes';

describe('validation actions', () => {
    it('should set card number valid', () => {
        const value = true;
        const expectedAction = { type: types.CARD_NUMBER_VALID, payload: value };
        expect(validation.setCardNumberValid(value)).to.eql(expectedAction);
    });

    it('should set expiry valid', () => {
        const value = false;
        const expectedAction = { type: types.EXPIRY_VALID, payload: value };
        expect(validation.setExpiryValid(value)).to.eql(expectedAction);
    });

    it('should set cvv valid', () => {
        const value = true;
        const expectedAction = { type: types.CVV_VALID, payload: value };
        expect(validation.setCvvValid(value)).to.eql(expectedAction);
    });
});
