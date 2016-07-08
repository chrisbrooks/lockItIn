module.exports = {
    development: {
        environment: 'development',
        raygunIsEnabled: true,
        raygunApiKey: '',
        paymentUrl: 'http://talent.seek.com.au.dev:3000/api/pay',
        analyticsScriptPath: 'https://assets.adobedtm.com/dev.js',
    },
    production: {
        environment: 'production',
        raygunIsEnabled: false,
        raygunApiKey: null,
        paymentUrl: 'http://talent.seek.com.au/api/pay',
        analyticsScriptPath: 'https://assets.adobedtm.com/prod.js',
    }
};
