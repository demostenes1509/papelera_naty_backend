
const modulealias = require('module-alias/register');
const appconfig = require('configs/appconfig');
const logger = require("configs/loggerconfig")(module);
const http = require('http');

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