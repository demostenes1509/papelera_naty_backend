require('dotenv-flow').config();
const appconfig = require('configs/appconfig');
const logger = require("configs/loggerconfig")(module);

logger.info('Configuring app');
Promise.resolve(appconfig(true))
.then(data => {
    const server = data.app.listen(process.env.app_http_port, function() {
        logger.info('Listening on port:'+server.address().port);
    });			
})
.catch(error => {
    logger.error(error);
});