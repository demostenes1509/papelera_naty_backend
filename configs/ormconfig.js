const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const orm = require('orm');
const transaction = require("orm-transaction");

module.exports = (app) => {

    return new Promise((resolve,reject) => {

        logger.debug("Setting database connection info");
		
		const opts = {
			database	: process.env.db_database,
			protocol	: process.env.db_protocol,
			host		: process.env.db_host,
			port		: process.env.db_port,
			user		: process.env.db_user,
			password	: process.env.db_password,
			query		:	{
				pool		: true,
				debug		: process.env.db_show_sql,
				strdates	: false
			}
        };
        
        app.use(orm.express(opts, {
            define: function (db, models) {

				logger.debug("Assigning transaction package to ORM");
                db.use(transaction);

				require('../app/models/categoriesmodel.js')(orm,db,models);
          
                resolve(db);
                
            }
        }));        
    });

};