import { expect } from 'chai';
import * as country from '../countryActions';
import * as types from '../actionTypes';

describe('location actions', () => {
    it('should create an action to set the right location', () => {
        const value = 'Australia';
        const expectedAction = { type: types.LOCATION, payload: value };
        const unexpectedAction = { type: types.LOCATION, payload: 'NewZealand' };
        expect(country.setLocation(value)).to.eql(expectedAction);
        expect(country.setLocation(value)).to.not.eql(unexpectedAction);
    });
});
