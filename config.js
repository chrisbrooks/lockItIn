console.log('process.env.AWS_ENVIRONMENT_NAME', process.env.AWS_ENVIRONMENT_NAME)
if (process.env.AWS_ENVIRONMENT_NAME === 'production') {
    console.log("HEEEEEERE production")
    module.exports = require('./config.prod.js');
} else if (process.env.AWS_ENVIRONMENT_NAME === 'staging') {
    console.log("HEEEEEERE staging")
    module.exports = require('./config.staging.js');
} else {
    module.exports = require('./config.dev.js');
}
