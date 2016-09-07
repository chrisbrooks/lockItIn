const env =  process.env;

const getConfig = (key, options = {}) => {
    const { optional = false } = options;

    if (key in  env) {
        return env[key];
    }
    if (!optional) {
        throw new Error(`Configuration Error: required environment variable "${key}" not found.`);
    }
};

const getConfigAsBool = key => getConfig(key) === 'true';

export const raygunIsEnabled = getConfigAsBool('RAYGUN_ENABLED');
export const raygunApiKey = getConfig('RAYGUN_API_KEY', { optional: !raygunIsEnabled });
export const analyticsIsEnabled = getConfigAsBool('ANALYTICS_ENABLED');
export const paymentUrl = getConfig('PAYMENT_ENDPOINT');
export const auditLoggerPath = getConfig('LOG_PATH');
export const auditLoggerLevel = getConfig('LOG_LEVEL');
export const stubHost = getConfig('STUB_HOST', { optional: true });
export const stubPort = getConfig('STUB_PORT', { optional: true });
export const environment = getConfig('ENVIRONMENT');
export const staticResourcePath = getConfig('STATIC_RESOURCE_PATH');
