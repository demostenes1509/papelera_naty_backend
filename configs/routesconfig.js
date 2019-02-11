const logger = require('configs/loggerconfig')(module);
const { categories,
        sidebar,
        home,
        footer,
				auth, 
				token,
        productspictures} = require('app/controllers');
const passport = require('passport');

const localAuth = passport.authenticate('login-local',{ session:false });
const facebookAuth = passport.authenticate('login-facebook',{ session:false });
const googleAuth = passport.authenticate('login-google',{ session:false, scope: ['profile','email'] });

const testWorkflow = (fn,req,res,next) => {
    fn(req,res,next)
    .catch(err=> {
        next(err);
    })
};

const noTestWorkflow = (fn,req,res,next) => {

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

const wrap = (fn) => {
    return (req, res, next) => {
        if(process.env.NODE_ENV==='test') {
            return testWorkflow(fn,req,res,next);
        }
        else {
            return noTestWorkflow(fn,req,res,next);
        }
    };
}

const restrict = (req,res,next) => {
    logger.info('Checking permissions');
    if(req.path.startsWith('/admin')) {
        if(req.session && req.session.isLoggedIn && req.session.isAdmin) {
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

	app.post('/logout', wrap(auth.logout));

	app.get('/token/:socketId', wrap(token.get));

	app.get('/categories', wrap(categories.list));
	app.post('/admin/categories', wrap(categories.create));

	app.get('/productspictures/:picture_id', wrap(productspictures.get));

	app.get('/sidebar', wrap(sidebar.get));

	app.get('/footer', wrap(footer.get));

	app.get('/', wrap(home.get_offers));
	app.get('/search/:search', wrap(home.get_search));
	app.get('/:category', wrap(home.get_category));

	app.get('/auth/facebook/callback', facebookAuth, wrap(auth.social));
	app.get('/auth/google/callback', googleAuth, wrap(auth.social));

	// app.get('/auth/facebook', facebookAuth);
	// app.get( '/auth/google', googleAuth);
	app.post('/auth/local', localAuth, wrap(auth.login));

	app.get(`/auth/google`, (req, res, next) => {
		const authenticator = passport.authenticate('login-google', { session: false, scope: ['profile', 'email'], state: req.token });
		authenticator(req, res, next);
	});

	app.get(`/auth/facebook`, (req, res, next) => {
		const authenticator = passport.authenticate('login-facebook', { session: false, state: req.token });
		authenticator(req, res, next);
	});

};


