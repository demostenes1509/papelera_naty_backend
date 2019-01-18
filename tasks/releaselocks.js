require('dotenv-flow').config();
const logger = require("configs/loggerconfig")(module);
const migrationconfig = require("configs/migrationconfig");


migrationconfig('releaseLocks')
.then(()=>logger.info('Locks released'))
.catch(err=> {
		logger.error(err);
});