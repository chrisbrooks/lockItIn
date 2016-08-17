import { expect } from 'chai';
import * as actions from 'calculationActions';
import * as types from '../actionTypes';

describe('actions', () => {
    it('should create an action to set the total amount', () => {
        const value = '500';
        const expectedAction = { type: types.TOTAL_AMOUNT, payload: value };
        expect(actions.setTotalAmount(value)).to.eql(expectedAction);
        expect(actions.setTotalAmount(value)).to.not.eql('sdsdsdsd');
    });

    it('should create an action to set the surcharge', () => {
        const value = { surcharge: 0, cardType: 'Amex' };
        const expectedAction = { type: types.SURCHARGE_UPDATED, payload: value };
        expect(actions.setSurcharge(value)).to.eql(expectedAction);
    });
});
