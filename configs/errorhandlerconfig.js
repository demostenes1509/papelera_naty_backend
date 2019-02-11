const logger = require("configs/loggerconfig")(module);

module.exports = (app) => {

    // No sacar ese next !!
    app.use((error, req, res, next) => {
        let errortext=error;
        if(error.message) errortext=error.message;

        logger.error(JSON.stringify(error));
        return res.status(500).send({'server_error':errortext});
    });

};
