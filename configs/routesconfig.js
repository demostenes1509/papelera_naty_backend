const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const controllers = require('../app/controllers/controller');

const wrap = (db,fn) => {
    return (req, res, next) => {
        const op = (process.env.NODE_ENV==='test'?'rollback':'commit');
        db.transaction(function (err, t) {
            if(err) return next(err);
            fn(req, res, next)
            .then( () => {
                t[op](function (err) {
                    if(err) return next(err);
                    return next();
                });
            })
            .catch(err => {
                t.rollback(function (errx) {
                    return next(err);
                });
            });
        });
    };
}

module.exports = (app,db) => {

    app.post 	( '/categories',                   wrap(db,controllers.categories.create));

};