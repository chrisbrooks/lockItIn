import { combineReducers } from 'redux';
import payment from './paymentReducer';

const rootReducer = combineReducers({
    payment,
});

export default rootReducer;
