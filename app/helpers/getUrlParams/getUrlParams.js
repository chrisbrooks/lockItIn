import base64 from 'base-64';
import queryString from 'query-string';

export function getUrlParams() {

    const url = window.location.href;
    const parameters = url.substring(url.indexOf('?') + 1);
    const base64Decode = base64.decode(parameters);

    return queryString.parse(base64Decode);
}
