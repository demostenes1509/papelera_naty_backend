const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const controllers = require('../app/controllers/controller');

const wrap = (db,fn) => {

    return (req, res, next) => {

        db.transaction()
        .then(t => {
            req.trx = t;
            return fn(req,res,next);
        })
        .then(() => {
            next();
            if(process.env.NODE_ENV==='test') return req.trx.rollback();
            else return req.trx.commit();
        })
        .catch(err=> {
            req.trx.rollback();
            next(err);
        })


        /*
        db.transaction(function (t) {
            console.log('MEC>1');
            if(err) return next(err);
            req.trx = t;

            console.log('MEC>2');
            fn(req, res, next)
            .then( () => {

                console.log('MEC>3');

                if(process.env.NODE_ENV==='test') {
                    t.rollback(function (errx) {
                        return next(err);
                    });
                }
                else {
                    t.commit(function (errx) {
                        return next(err);
                    });
                }
            })
            .catch(err => {
                console.log('MEC>4');
                t.rollback(function (errx) {
                    return next(err);
                });
            });
        });
        */
    };
}

module.exports = (app,db) => {

    app.get 	( '/categories',                   wrap(db,controllers.categories.list));
    app.post 	( '/categories',                   wrap(db,controllers.categories.create));

};