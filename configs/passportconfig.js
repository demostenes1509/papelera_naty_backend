const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cypherutil = require("utils/cypherutil");
const { generateToken, sendToken } = require('utils/tokensutil');

module.exports = (app, db) => {

	passport.use(new LocalStrategy(async (email, password, done) => {
		let user;
		try {
			logger.info('Looking for user');
			const params = { where: { email_address: email }, include: [{ model: db.models.roles, as: 'role' }] };
			user = await db.models.users.findOne(params);
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
	app.use(passport.session());

	// app.post('/login', function (req, res, next) {
	// 		console.log(req);
	// 	}
	// );

	app.post(
		'/login',
		passport.authenticate('local', { session: false }),
		(req, res) => {

			if (!req.user) {
				throw new Error('Invalid username/password');
			}

			logger.info('Responding to user');
			const { first_name, last_name } = req.user;
			const isAdmin = req.user.role.name === 'admin';
			
			return res.status(200).send({isAdmin, firstName: first_name, lastName: last_name});

		},generateToken, sendToken
	);



}
