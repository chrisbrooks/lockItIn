import { expect } from 'chai';
import * as calculation from './calculationActions';
import * as types from '../actionTypes';

describe('actions', () => {
    it('should create an action to set the total amount', () => {
        const value = '500';
        const expectedAction = { type: types.TOTAL_AMOUNT, payload: value };
        expect(calculation.setTotalAmount(value)).to.eql(expectedAction);
        expect(calculation.setTotalAmount(value)).to.not.eql('sdsdsdsd');
    });

    it('should create an action to set the surcharge', () => {
        const value = { surcharge: 0, cardType: 'Amex' };
        const expectedAction = { type: types.SURCHARGE_UPDATED, payload: value };
        expect(calculation.setSurcharge(value)).to.eql(expectedAction);
    });
});
