import * as constants from '../../constants';
import * as types from '../actionTypes';
import axios from 'axios';
import { dateChangeUrl, sendReminderUrl } from '../../../config.js'; // eslint-disable-line

export function loading(value) {
    return { type: types.LOADING, payload: value };
}

export function dateChangeSuccess(value) {
    return { type: types.DATE_CHANGE_SUCCESS, payload: value };
}

export function dateChangeError(error) {

    return { type: types.DATE_CHANGE_ERROR, payload: error };
}

export function selectedItem(value) {
    return { type: types.SELECTED_ITEM, payload: value };
}

export function sendDateChange(interviewId, interviewTime) {
    return dispatch => {

        const dateData = {
            interviewId,
            interviewTime,
        };

        const changingDateUrl = `${dateChangeUrl}`;

        dispatch(loading(true));

        axios.post(changingDateUrl, dateData).then(() => {

            dispatch(dateChangeSuccess('Date Successfully added'));
            dispatch(loading(false));

            setTimeout(function(){
                dispatch(dateChangeSuccess(false));
            }, 2000);

        }).catch((error) => {

            dispatch(dateChangeError('Sorry there was an error'));
            dispatch(loading(false));

            setTimeout(function(){
                dispatch(dateChangeError(false));
            }, 2000);

        });
    };
}

export function sendReminder(interviewId) {
    return dispatch => {

        console.log(interviewId);
        const sendingReminderUrl = `${sendReminderUrl}`;

        dispatch(loading(true));

        axios.post(sendingReminderUrl, interviewId).then(() => {

            dispatch(dateChangeSuccess('Date Successfully added'));
            dispatch(loading(false));

            setTimeout(function(){
                dispatch(dateChangeSuccess(false));
            }, 2000);

        }).catch((error) => {

            dispatch(dateChangeError('Sorry there was an error'));
            dispatch(loading(false));

            setTimeout(function(){
                dispatch(dateChangeError(false));
            }, 2000);

        });
    };
}
