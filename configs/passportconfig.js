const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const cypherutil = require("utils/cypherutil");
const modelsutil = require("utils/modelsutil");

const createOrFindUser = async (req, profile, provider, filter, done) => {
	try {
		logger.debug(JSON.stringify(profile, null, '    '));

		const role = await modelsutil.findOne(req, 'roles', { where: { name: 'client' } });
		const data = {
			where: filter, defaults: {
				first_name: profile.name.givenName,
				last_name: profile.name.familyName,
				provider,
				google_id: profile.id,
				email_address: profile.emails[0].value,
				role_id: role.id
			}
		};

		const user = await modelsutil.findOrCreate(req, 'users', data);
		user[0].role = role;

		done(null, user[0]);
	}
	catch (err) {
		done(err);
	}
};

module.exports = (app) => {

	passport.use('login-local', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
		let user;
		try {
			logger.info('Looking for user');
			const params = { where: { email_address: email, provider: 'local' }, include: [{ model: req.db.models.roles, as: 'role' }] };
			user = await modelsutil.findOne(req, 'users', params);
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

	passport.use('login-facebook', new FacebookStrategy(
		{
			clientID: process.env.auth_facebook_client_id,
			clientSecret: process.env.auth_facebook_client_secret,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'email', 'first_name', 'last_name'],
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, profile, done) => {
			await createOrFindUser(req, profile, 'facebook', { facebook_id: profile.id }, done);
		}
	));

	passport.use('login-google', new GoogleStrategy(
		{
			clientID: process.env.auth_google_client_id,
			clientSecret: process.env.auth_google_client_secret,
			passReqToCallback: true,
			callbackURL: '/auth/google/callback'
		},
		async (req, accessToken, refreshToken, profile, done) => {
			await createOrFindUser(req, profile, 'google', { google_id: profile.id }, done);
		}
	));

	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.auth_jwt_secret,
		passReqToCallback: true
	}, async (req, jwt_payload, done) => {

		logger.debug(JSON.stringify(jwt_payload, null, '    '));
		const user = await modelsutil.findById(req, 'users', jwt_payload.id);
		if (user) {
			if(req.path.startsWith('/admin')) {
				if(jwt_payload.isAdmin) return done(null, user);
				else return done('You have no permissions to access this page');
			}
			return done(null, user);
		}
		else return done('Invalid jwt token');
	}));

	app.use(passport.initialize());
}
