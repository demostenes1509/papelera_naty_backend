const controllers = require('app/controllers/controller');

const wrap = (db,fn) => {

    return (req, res, next) => {

        db.transaction()
        .then(t => {
            req.trx = t;
            return fn(req,res,next);
        })
        .then(() => {
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

    app.get 	( '/categories',                    wrap(db,controllers.categories.list));
    app.post 	( '/categories',                    wrap(db,controllers.categories.create));

    app.get 	( '/',                              wrap(db,controllers.home.get_offers));
    app.get 	( '/search/:search',                wrap(db,controllers.home.get_search));
    app.get 	( '/:category',                     wrap(db,controllers.home.get_category));
    app.get 	( '/:category/:product',            wrap(db,controllers.home.get_product));

};