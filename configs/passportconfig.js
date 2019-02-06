const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cypherutil = require("utils/cypherutil");
const modelsutil = require("utils/modelsutil");
const { TOKEN_NAME } = require('configs/constantsconfig');

module.exports = (app, db) => {

	passport.use(new LocalStrategy({passReqToCallback: true, session: false},async (req, email, password, done) => {
		let user;
		try {
			logger.info('Looking for user');
			const params = { where: { email_address: email }, include: [{ model: db.models.roles, as: 'role' }] };
			user = await modelsutil.findOne(req,'users',params);
			if (!user) {
				return done(null, false, { message: 'No user by that email' });
			}
		}
		catch (e) {
			return done(e);
		}

		logger.info('Validating password');
		if (user.password !== cypherutil(password)) {
			return done(null, false, { message: 'Not a matching password' });
		}
		return done(null, user);
	}));

	passport.serializeUser(function(user, cb) {
		logger.info('serializeUser');
		cb(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		logger.info('deserializeUser');
		try {
			const user = await db.models.users.findById(id);
			if (!user) {
				return done(new Error('user not found'));
			}
			return done(null, user);
		}
		catch (e) {
			return done(e);
		}
	});

	app.use(passport.initialize());
	// app.use(passport.session());

	app.post('/login',passport.authenticate('local', { session: false }), async (req, res, next) => {
	
			logger.info('Authentication finished. Checking results');
			if (!req.user) {
				return next('Invalid username/password');
			}

			try {
				logger.info('Assigning user to session');
				const { userSession } = req;
				await modelsutil.save(req,userSession,{user_id: req.user.id});

				logger.info('Responding to user');
				const { first_name, last_name } = req.user;
				const isAdmin = req.user.role.name === 'admin';
				
				return res.status(200).send({[TOKEN_NAME]: req.token, isLoggedIn: true, isAdmin, firstName: first_name, lastName: last_name});
			}
			catch(err) {
				return next(err);
			}
		});
}
