/* eslint-disable global-require */
function createToken(stripeData, callback) {

    switch (stripeData.exp) {

        case '10/28': {
            return callback(400, {token: 'charge_amount_invalid'});
        }

        case '10/29': {
            return callback(400, {token: 'card_not_supported_token'});
        }

        case '10/30': {
            return callback(400, {token: 'expired_card_token'});
        }

        case '10/31': {
            return callback(400, {token: 'declined_card_fraud_token'});
        }

        case '10/32': {
            return callback(400, {token: 'incorrect_cvv_card_token'});
        }

        case '10/33': {
            return callback(400, {token: 'declined_card_token'});
        }

        case '10/34': {
            return callback(200, {token: 'token'});
        }

        case '10/35': {
            return callback(200, {token: 'invalid_token'});
        }

        default: {
            return callback(200, {"token": "token"});
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
