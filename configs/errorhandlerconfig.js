const logger = require("configs/loggerconfig")(module);

module.exports = (app) => {

    // No sacar ese next !!
    app.use((error, req, res, next) => {
        logger.error(JSON.stringify(error.message));
        return res.status(500).send({'server_error':error.message});
    });

};
