const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const liquibase = require('liquibase');

module.exports = async (db,command) => {

    const {
        NODE_ENV,
        db_host,
        db_port,
        db_database,
        db_user,
        db_password
    } = process.env;

    await liquibase({   changeLogFile: `migrations/liquibase_${NODE_ENV}.xml`,
                        url: `jdbc:postgresql://${db_host}:${db_port}/${db_database}?charSet=UTF-8`,
                        username: db_user,
                        password: db_password
    }).run(command, '');
};
