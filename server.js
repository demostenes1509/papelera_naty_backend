require('dotenv-flow').config();
const appconfig = require('configs/appconfig');
const logger = require("configs/loggerconfig")(module);
const fs = require('fs');
const https = require('https');
const http = require('http');
const socketio = require('socket.io');

logger.info('Configuring app');
Promise.resolve(appconfig(true))
.then(data => {
		let server;
		if (process.env.NODE_ENV === 'production') {
			server = http.createServer(data.app);
		}
		else {
			const certOptions = {
				key: fs.readFileSync('certs/server.key'),
				cert: fs.readFileSync('certs/server.crt')
			}
			server = https.createServer(certOptions, data.app)
		}

		const io = socketio(server);
		data.app.set('io', io);

		server.listen(process.env.app_http_port, () => {
			logger.info('Listening on port:'+server.address().port);
		})
})
.catch(error => {
    logger.error(error);
});