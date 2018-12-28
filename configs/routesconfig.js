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

    };
}

module.exports = (app,db) => {

    app.get 	( '/categories',                   wrap(db,controllers.categories.list));
    app.get 	( '/categoriesproducts',           wrap(db,controllers.categories.list_categories_and_products));
    app.post 	( '/categories',                   wrap(db,controllers.categories.create));

};