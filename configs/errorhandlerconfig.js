const modulealias = require('module-alias/register');
const logger = require("@logger")(module);

module.exports = (app) => {

    app.use((error, req, res, next) => {
        logger.error(error.message);
        return res.status(500).send({'server_error':error.message});
    });

};
