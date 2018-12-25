
const modulealias = require('module-alias/register');
const appconfig = require('@appconfig');
const logger = require("@logger")(module);
const http = require('http');

appconfig((error, app, db) => {

    if(error) {
        logger.error(error);
        return;
    }

	const http_server = http.createServer();
	http_server.on('request',app);
	
	logger.info("Starting http server");
	http_server.listen(process.env.app_http_port,() => {
		logger.info('Listening http on port:'+http_server.address().port);
    });


});