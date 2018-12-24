const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const orm = require('orm');
// const MigrateTask = require('migrate-orm2');

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

                // var task = new MigrateTask(db.driver, {dir: 'migrations'});

                // task.up('001-create-table1.js', function (err, result) {
                //     if(err) reject(err);

                //     resolve(db);
                // });
          
                resolve(db);
                
            }
        }));        
    });

};