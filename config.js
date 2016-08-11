if (process.env.NODE_ENV === 'production') {
    module.exports = require('./config.prod.js');
} else if (process.env.NODE_ENV === 'staging') {
    module.exports = require('./config.staging.js');
} else {
    module.exports = require('./config.dev.js');
}
