import { expect } from 'chai';
import reducer from './urlQueryReducer';
import initialState from '../initialState';
import {
    URL_QUERY,
} from '../../actions/actionTypes';

describe('url query reducer', () => {

    const state = initialState.urlQuery;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            customerNumber: null,
            invoiceNumber: null,
            amount: null,
            prn: null,
            email: null,
        });
    });

    it('should return the correct location state', () => {
        const urlQuery = {
            customernumber: '254351244',
            invoicenumber: '24566222',
            amount: '300',
            prn: '76412333wsd',
            email: 'chris@gmail.com',
        };
        expect(reducer((state), {
            type: URL_QUERY,
            payload: urlQuery,
        })).to.eql({
            customerNumber: '254351244',
            invoiceNumber: '24566222',
            amount: '300',
            prn: '76412333wsd',
            email: 'chris@gmail.com',
        });
    });

});
