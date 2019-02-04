const express = require('express');
const logger = require("configs/loggerconfig")(module);
const ormconfig = require("configs/ormconfig");
const migrationconfig = require("configs/migrationconfig");
const routesconfig = require("configs/routesconfig");
const expressconfig = require("configs/expressconfig");
const sessionconfig = require("configs/sessionconfig");
const passportconfig = require("configs/passportconfig");
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
        await migrationconfig('update');
		}
		
		logger.info('Configuring passport');
		passportconfig(app,db);

    // logger.info('Configuring sessions');
    // await sessionconfig(app);

    logger.info('Configuring routes');
		await routesconfig(app,db);
		
    logger.info('Configuring error handler');
    errorhandlerconfig(app);

    return {app,db};


};