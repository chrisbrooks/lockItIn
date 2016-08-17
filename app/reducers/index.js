import { combineReducers } from 'redux';
import event from './eventReducer/eventReducer';
import calculation from './calculationReducer/calculationReducer';
import payment from './paymentReducer/paymentReducer';
import validation from './validationReducer/validationReducer';
import card from './cardReducer/cardReducer';
import urlQuery from './urlQueryReducer/urlQueryReducer';
import country from './countryReducer/countryReducer';

const rootReducer = combineReducers({
    event,
    calculation,
    payment,
    validation,
    card,
    urlQuery,
    country,
});

export default rootReducer;
