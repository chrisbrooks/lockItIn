import { expect } from 'chai';
import * as urlQueryActions from '../urlQueryActions';
import * as types from '../actionTypes';

describe('url query actions', () => {
    it('should create an action to set the card number', () => {
        const value = {
            customerNumber: '346537356',
            invoiceNumber: '323412343412',
            prn: '4343radf23',
            email: 'chris@dddd.com',
            amount: '300',
        };
        const expectedAction = { type: types.URL_QUERY, payload: value };
        expect(urlQueryActions.urlQuery(value)).to.eql(expectedAction);
    });
});
