const express = require('express');
const dotentflow = require('dotenv-flow').config();
const logger = require("@logger")(module);
const ormconfig = require("@ormconfig");
const migrationconfig = require("@migrationconfig");
const routesconfig = require("@routesconfig");

module.exports = async (callback) => {

    try {

        logger.info('Creating express');
        const app = express();

        logger.info('Configuring orm');
        const db = await ormconfig(app);

        logger.info('Running migrations');
        await migrationconfig(db);

        logger.info('Configuring routes');
        await routesconfig(app);

        return callback(null,app,db);
    }
    catch(error) {
        callback(error);
    }


};