const express = require('express');
const dotentflow = require('dotenv-flow').config();
const logger = require("@logger")(module);
const ormconfig = require("@ormconfig");
const migrationconfig = require("@migrationconfig");

module.exports = async (callback) => {

    try {

        logger.info('Creating express');
        const app = express();

        logger.info('Configuring orm');
        const db = await ormconfig(app);

        logger.info('Running migrations');
        await migrationconfig(db);



        logger.info('Callback');

        return callback(null,app);
    }
    catch(error) {
        callback(error);
    }


};