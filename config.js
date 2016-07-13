module.exports = {
    development: {
        environment: 'development',
        raygunIsEnabled: true,
        raygunApiKey: '',
        paymentUrl: 'http://payments.stag.aws.seekprod.local',
        stripePublishableKey: 'pk_test_BgjSlFxxesmRQfLEusmL62I4',
        analyticsScriptPath: 'https://assets.adobedtm.com/dev.js',
    },
    production: {
        environment: 'production',
        raygunIsEnabled: false,
        raygunApiKey: null,
        paymentUrl: 'http://talent.seek.com.au/api/pay',
        stripePublishableKey: '',
        analyticsScriptPath: 'https://assets.adobedtm.com/prod.js',
    },
};
