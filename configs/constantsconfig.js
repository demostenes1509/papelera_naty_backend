const logger = require("configs/loggerconfig")(module);

const define = (name, value) => {
	if (!Reflect.defineProperty(exports, name, {value: value})) {
		logger.error(`Property ${name} was not created !`);
	}
}

define("TOKEN_NAME", 'token');

define("AUTHORIZATION", 'Authorization');
