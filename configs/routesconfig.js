const logger = require('configs/loggerconfig')(module);
const {categories,sidebar,home,footer,auth, productspictures} = require('app/controllers');

const testWorkflow = (app,fn,req,res,next) => {
    fn(req,res,next)
    .catch(err=> {
        next(err);
    })
};

const noTestWorkflow = (app,fn,req,res,next) => {

    req.db.transaction()
    .then(t => {
        req.trx = t;
        return fn(req,res,next);
    })
    .then(() => {
        return req.trx.commit();
    })
    .catch(err=> {
        req.trx.rollback();
        next(err);
    })
};

const wrap = (app,fn) => {
    return (req, res, next) => {
        if(process.env.NODE_ENV==='test') {
            return testWorkflow(app,fn,req,res,next);
        }
        else {
            return noTestWorkflow(app,fn,req,res,next);
        }
    };
}

const restrict = (req,res,next) => {
    logger.info('Checking permissions');
    if(req.path.indexOf('/admin')===0) {
        if(req.session.isLoggedIn && req.session.isAdmin) {
            next();
        }
        else {
            next('You have no permissions to access this page');
        }
    }
    else {
        next();
    }
}

module.exports = (app) => {

    app.use(restrict);

    app.post 	( '/login',                         wrap(app,auth.login));

    app.get 	( '/categories',                    wrap(app,categories.list));
    app.post 	( '/admin/categories',              wrap(app,categories.create));

    app.get 	( '/productspictures/:picture_id',  wrap(app,productspictures.get));

    app.get 	( '/sidebar',                       wrap(app,sidebar.get));

    app.get 	( '/footer',                        wrap(app,footer.get));

    app.get 	( '/',                              wrap(app,home.get_offers));
    app.get 	( '/search/:search',                wrap(app,home.get_search));
    app.get 	( '/:category',                     wrap(app,home.get_category));


};