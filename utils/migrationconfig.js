const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const MigrateTask = require('migrate-orm2');

const runTask = (task,taskname) => {
    return new Promise((resolve,reject) => {
        task.up(taskname, function (err, result) {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = async (db) => {

    var task = new MigrateTask(db.driver, {dir: process.env.migrations_dir});
    await runTask(task,'001-create-table1.js');

    // task.up('001-create-table1.js', function (err, result) {
    //     if(err) reject(err);

    //     resolve(db);
    // });
          
};