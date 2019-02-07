const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cypherutil = require("utils/cypherutil");
const modelsutil = require("utils/modelsutil");

module.exports = (app) => {

	passport.use(new LocalStrategy({passReqToCallback: true, session: false},async (req, email, password, done) => {
		let user;
		try {
			logger.info('Looking for user');
			const params = { where: { email_address: email }, include: [{ model: req.db.models.roles, as: 'role' }] };
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

	app.use(passport.initialize());

}
