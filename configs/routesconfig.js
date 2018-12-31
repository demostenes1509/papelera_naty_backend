const {categories,sidebar,home,footer} = require('app/controllers');

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

    app.get 	( '/categories',                    wrap(db,categories.list));
    app.post 	( '/categories',                    wrap(db,categories.create));

    app.get 	( '/sidebar',                       wrap(db,sidebar.get));

    app.get 	( '/footer',                        wrap(db,footer.get));

    app.get 	( '/',                              wrap(db,home.get_offers));


};