const express = require('express');
const dotentflow = require('dotenv-flow').config();
const logger = require("configs/loggerconfig")(module);
const ormconfig = require("configs/ormconfig");
const migrationconfig = require("configs/migrationconfig");
const routesconfig = require("configs/routesconfig");
const expressconfig = require("configs/expressconfig");
const errorhandlerconfig = require("configs/errorhandlerconfig");

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