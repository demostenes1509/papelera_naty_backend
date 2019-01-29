const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cypherutil = require("utils/cypherutil");
const { generateToken, sendToken } = require('utils/tokensutil');

module.exports = (app, db) => {

	app.use(passport.initialize());
	app.use(passport.session());
	
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
		cb(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
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

	app.post(
		'/login',
		passport.authenticate('local', { failureRedirect: '/login' }),
		function (req, res) {
			console.log('===>'+req.user);
			res.redirect('/');
		},generateToken, sendToken
	);


}
