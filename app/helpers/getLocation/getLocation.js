import * as constants from '../../constants';
import Stripe from '../../mocks/stripe/configureStripe'; // eslint-disable-line
import { stripeAuPublishableKey, stripeNzPublishableKey } from '../../../config.js'; // eslint-disable-line

export function getLocation() {

    const url = window.location.href;

    if (/co.nz/.test(url)) {
        Stripe.setPublishableKey(stripeNzPublishableKey); // eslint-disable-line no-undef
        return constants.location.NZ;
    }

    Stripe.setPublishableKey(stripeAuPublishableKey); // eslint-disable-line no-undef
    return constants.location.AU;
}
