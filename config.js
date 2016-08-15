if (process.env.AWS_ENVIRONMENT_NAME === 'production') {
    module.exports = require('./config.prod.js');
} else if (process.env.AWS_ENVIRONMENT_NAME === 'staging') {
    module.exports = require('./config.staging.js');
} else {
    module.exports = require('./config.dev.js');
}
