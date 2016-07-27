import { combineReducers } from 'redux';
import actions from './reducer';
import payment from './paymentReducer';
import validation from './validationReducer';
import card from './cardReducer';
import urlQuery from './urlQueryReducer';
import country from './countryReducer';

const rootReducer = combineReducers({
    actions,
    payment,
    validation,
    card,
    urlQuery,
    country,
});

export default rootReducer;
