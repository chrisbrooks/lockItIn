/* eslint-disable global-require */
function createToken(stripeData) {

    switch (stripeData.exp) {

        case '10/30': {
            return {
                token: 'charge_amount_invalid',
            };
        }

        case '10/31': {
            return {
                token: 'card_not_supported_token',
            };
        }

        case '10/32': {
            return {
                token: 'expired_card_token',
            };
        }

        case '10/33': {
            return {
                token: 'declined_card_fraud_token',
            };
        }

        case '10/34': {
            return {
                token: 'incorrect_cvv_card_token',
            };
        }

        case '10/35': {
            return {
                token: 'declined_card_token',
            };
        }

        case '10/36': {
            return {
                token: 'invalid_token',
            };
        }

        default: {
            return {
                token: 'token',
            };
        }
    }
}

function setPublishableKey(stripeKey) {
    return stripeKey;
}

export default {
    createToken,
    setPublishableKey,
};
