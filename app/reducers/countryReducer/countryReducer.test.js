import { expect } from 'chai';
import reducer from 'countryReducer';
import initialState from '../initialState';
import {
    LOCATION,
} from '../../actions/actionTypes';

describe('country reducer', () => {

    const state = initialState.country;

    it('should return the correct default state', () => {
        expect(reducer((state), {})).to.eql({
            country: 'Australia',
        });
    });

    it('should return the correct location state', () => {
        const country = 'NewZealand';
        expect(reducer((state), {
            type: LOCATION,
            payload: country,
        })).to.eql({ country: 'NewZealand' });
    });

});
