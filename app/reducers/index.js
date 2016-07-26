import { combineReducers } from 'redux';
import actions from './reducer';
import paymentActions from './paymentReducer';
import validationActions from './validationReducer';
import cardActions from './cardReducer';
import urlQueryActions from './urlQueryReducer';
import locationActions from './locationReducer';

const rootReducer = combineReducers({
    actions,
    paymentActions,
    validationActions,
    cardActions,
    urlQueryActions,
    locationActions,
});

export default rootReducer;
