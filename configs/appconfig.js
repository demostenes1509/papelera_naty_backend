const express = require('express');
const dotentflow = require('dotenv-flow').config();
const logger = require("@logger")(module);
const ormconfig = require("@ormconfig");
const migrationconfig = require("@migrationconfig");
const routesconfig = require("@routesconfig");
const expressconfig = require("@expressconfig");
const errorhandlerconfig = require("@errorhandlerconfig");

module.exports = async (runmigrations) => {

    logger.info('Creating express');
    const app = express();

    logger.info('Configuring express');
    expressconfig(app);

    logger.info('Configuring orm');
    const db = await ormconfig(app);

    if(runmigrations) {
        logger.info('Running migrations');
        await migrationconfig(db,'update');
    }

    logger.info('Configuring routes');
    await routesconfig(app,db);

    logger.info('Configuring error handler');
    errorhandlerconfig(app);

    return {app,db};


};