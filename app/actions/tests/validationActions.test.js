import { expect } from 'chai';
import * as validationActions from '../validationActions';
import * as types from '../actionTypes';

describe('validation actions', () => {
    it('should set card number valid', () => {
        const value = true;
        const expectedAction = { type: types.CARD_NUMBER_VALID, payload: value };
        expect(validationActions.setCardNumberValid(value)).to.eql(expectedAction);
    });

    it('should set expiry valid', () => {
        const value = false;
        const expectedAction = { type: types.EXPIRY_VALID, payload: value };
        expect(validationActions.setExpiryValid(value)).to.eql(expectedAction);
    });

    it('should set cvv valid', () => {
        const value = true;
        const expectedAction = { type: types.CVV_VALID, payload: value };
        expect(validationActions.setCvvValid(value)).to.eql(expectedAction);
    });
});
