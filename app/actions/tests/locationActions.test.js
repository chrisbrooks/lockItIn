import { expect } from 'chai';
import * as locationActions from '../locationActions';
import * as types from '../actionTypes';

describe('location actions', () => {
    it('should create an action to set the right location', () => {
        const value = 'Australia';
        const expectedAction = { type: types.LOCATION, payload: value };
        const unexpectedAction = { type: types.LOCATION, payload: 'NewZealand' };
        expect(locationActions.setLocation(value)).to.eql(expectedAction);
        expect(locationActions.setLocation(value)).to.not.eql(unexpectedAction);
    });
});
