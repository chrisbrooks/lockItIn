import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import PaymentApi from '../api/paymentApi';

export function storeQuery(query) {
    return { type: types.STORE_QUERY, payload: query };
}
