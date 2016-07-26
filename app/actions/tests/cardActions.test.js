import { expect } from 'chai';
import * as cardActions from '../cardActions';
import * as types from '../actionTypes';

describe('card actions', () => {
    it('should create an action to set the card number', () => {
        const value = '1111 1111 1111 1111';
        const expectedAction = { type: types.CARD_NUMBER_UPDATED, payload: value };
        expect(cardActions.setCardNumber(value)).to.eql(expectedAction);
    });

    it('should create an action to set the expiry', () => {
        const value = '10/18';
        const expectedAction = { type: types.EXPIRY_UPDATED, payload: value };
        expect(cardActions.setExpiry(value)).to.eql(expectedAction);
    });

    it('should create an action to set the cvv', () => {
        const value = '371';
        const expectedAction = { type: types.CVV_UPDATED, payload: value };
        expect(cardActions.setCvv(value)).to.eql(expectedAction);
    });
});
