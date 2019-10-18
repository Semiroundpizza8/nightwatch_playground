require('dotenv').config()
const baseConfig = require('./nightwatch.conf.js');

const config = {
    ...baseConfig,
    webdriver: {
        start_process: false,
        host: 'hub-cloud.browserstack.com',
        port: 80
    },
}

const desiredCapabilities = baseConfig.test_settings.default.desiredCapabilities
desiredCapabilities['browserstack.user'] = process.env.BROWSERSTACK_USERNAME
desiredCapabilities['browserstack.key'] = process.env.BROWSERSTACK_ACCESS_KEY
console.log({desiredCapabilities})
desiredCapabilities.chromeOptions.args = []

baseConfig.test_settings.ie = {
    os : 'Windows',
    os_version : '10',
    browserName : 'IE',
    browser_version : '11.0',
    'browserstack.local' : 'false',
}

for(var i in config.test_settings) {
    var test_setting = config.test_settings[i];
    test_setting.selenium_host = config.webdriver.host;
    test_setting.selenium_port = config.webdriver.port;
}

module.exports = config