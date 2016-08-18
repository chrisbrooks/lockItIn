import { expect } from 'chai';
import * as event from './eventActions';
import * as types from '../actionTypes';

describe('actions', () => {
    it('should create an action to set the toggle', () => {
        const value = true;
        const expectedAction = { type: types.TOGGLE, payload: value };
        expect(event.setToggle(value)).to.eql(expectedAction);
    });
});
