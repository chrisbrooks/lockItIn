import { PAYMENT_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
    case PAYMENT_SUCCESS:
        return { ...state, ...{ complete: true } };

    default:
        return state;
    }
}
