const { categories,
        sidebar,
        home,
        footer,
				auth, 
        productspictures} = require('app/controllers');
const passport = require('passport');

const localAuth = passport.authenticate('login-local',{ session:false });
const jwtAuth = passport.authenticate('jwt', { session: false });

const facebookAuth = (req, res, next) => {
	const authenticator = passport.authenticate('login-facebook', { session: false, state: req.query.socketId });
	authenticator(req, res, next);
};
const googleAuth = (req, res, next) => {
	const authenticator = passport.authenticate('login-google', { session: false, scope: ['profile', 'email'], state: req.query.socketId });
	authenticator(req, res, next);
};

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

module.exports = (app) => {

	app.post('/auth/local', localAuth, wrap(auth.login));
	app.get(`/auth/google`, googleAuth);
	app.get(`/auth/facebook`,facebookAuth);

	app.get('/auth/facebook/callback', facebookAuth, wrap(auth.social));
	app.get('/auth/google/callback', googleAuth, wrap(auth.social));

	app.get('/categories', wrap(categories.list));
	app.post('/admin/categories', jwtAuth, wrap(categories.create));

	app.get('/productspictures/:picture_id', wrap(productspictures.get));

	app.get('/sidebar', wrap(sidebar.get));

	app.get('/footer', wrap(footer.get));

	app.get('/', wrap(home.get_offers));
	app.get('/search/:search', wrap(home.get_search));
	app.get('/:category', wrap(home.get_category));



};


