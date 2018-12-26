const express = require('express');
const dotentflow = require('dotenv-flow').config();
const logger = require("@logger")(module);
const ormconfig = require("@ormconfig");
const migrationconfig = require("@migrationconfig");
const routesconfig = require("@routesconfig");
const expressconfig = require("@expressconfig");
const errorhandlerconfig = require("@errorhandlerconfig");

module.exports = async (callback) => {

    try {

        logger.info('Creating express');
        const app = express();

        logger.info('Configuring express');
        expressconfig(app);

        logger.info('Configuring orm');
        const db = await ormconfig(app);

        logger.info('Running migrations');
        await migrationconfig(db);

        logger.info('Configuring routes');
        await routesconfig(app,db);

        logger.info('Configuring error handler');
        errorhandlerconfig(app);

        return callback(null,app,db);
    }
    catch(error) {
        callback(error);
    }


};