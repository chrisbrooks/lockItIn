import * as constants from '../../constants';

export function getLocation() {

    const url = window.location.href;

    if (/co.nz/.test(url)) {
        return constants.location.NZ;
    }
    // eslint-disable-line no-undef
    return constants.location.AU;
}
