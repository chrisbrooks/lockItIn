/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
    module.exports = window.Stripe;
} else {
    module.exports = require('./configureStripe.dev.js');
}
