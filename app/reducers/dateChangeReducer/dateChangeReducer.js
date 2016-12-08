import {
    LOADING,
    DATE_CHANGE_SUCCESS,
    DATE_CHANGE_ERROR,
    SELECTED_ITEM,
} from '../../actions/actionTypes';

import initialState from './../initialState';

export default function reducer(state = initialState.dateChange, action) {
    switch (action.type) {

        case LOADING: {
            const loading = action.payload;
            return { ...state, loading };
        }

        case DATE_CHANGE_SUCCESS: {
            const dateChangeSuccess = action.payload;
            return { ...state, dateChangeSuccess };
        }

        case DATE_CHANGE_ERROR: {
            const dateChangeError = action.payload;
            return { ...state, dateChangeError };
        }

        case SELECTED_ITEM: {
            const selectedItem = action.payload;
            return { ...state, selectedItem };
        }

        default: {
            return state;
        }
    }
}
