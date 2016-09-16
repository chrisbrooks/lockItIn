import {
    LOADING,
    PAYMENT_SUCCESS,
    PAYMENT_ERROR,
} from '../../actions/actionTypes';

import initialState from './../initialState';

export default function reducer(state = initialState.payment, action) {
    switch (action.type) {

        case LOADING: {
            const loading = action.payload;
            return { ...state, loading };
        }

        case PAYMENT_SUCCESS: {
            const paymentSuccess = action.payload;
            return { ...state, paymentSuccess };
        }

        case PAYMENT_ERROR: {
            const paymentError = action.payload.paymentError;
            const paymentErrorMessage = action.payload.paymentErrorMessage;
            return { ...state, paymentError, paymentErrorMessage };
        }

        default: {
            return state;
        }
    }
}
