import { combineReducers } from 'redux';
import dateChange from './dateChangeReducer/dateChangeReducer';
import candidateInfo from './candidateInfoReducer/candidateInfoReducer';
import country from './countryReducer/countryReducer';

const rootReducer = combineReducers({
    dateChange,
    candidateInfo,
    country,
});

export default rootReducer;
