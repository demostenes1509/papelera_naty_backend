const {categories,sidebar,home,footer} = require('app/controllers');

const wrap = (fn) => {

    return (req, res, next) => {

        req.db.transaction()
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

module.exports = (app) => {

    app.get 	( '/categories',                    wrap(categories.list));
    app.post 	( '/categories',                    wrap(categories.create));

    app.get 	( '/sidebar',                       wrap(sidebar.get));

    app.get 	( '/footer',                        wrap(footer.get));

    app.get 	( '/',                              wrap(home.get_offers));
    app.get 	( '/search/:search',                wrap(home.get_search));
    app.get 	( '/:category',                     wrap(home.get_category));


};