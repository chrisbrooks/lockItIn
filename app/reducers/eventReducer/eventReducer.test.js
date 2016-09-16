import { expect } from 'chai';
import reducer from './eventReducer';
import initialState from '../initialState';
import {
    TOGGLE,
} from '../../actions/actionTypes';

describe('main default reducer', () => {

    const state = initialState.event;

    it('should return the correct card number validation state', () => {
        const toggle = true;
        expect(reducer((state), {
            type: TOGGLE,
            payload: toggle,
        })).to.eql({
            toggle: true,
        });
    });

});
