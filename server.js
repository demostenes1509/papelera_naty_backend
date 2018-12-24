
const modulealias = require('module-alias/register');
const appconfig = require('@appconfig');
const logger = require("@logger")(module);

appconfig((error, app, db) => {

    if(error) {
        logger.error(error);
        return;
    }

    const { MAXI } = process.env;

    console.log(MAXI);

});