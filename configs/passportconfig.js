const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter-oauth2');
const InstagramStrategy = require('passport-instagram');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const cypherutil = require("utils/cypherutil");
const R = require('ramda');

const createOrFindUser = async (req, profile, provider, done) => {
	try {
		logger.debug(JSON.stringify(profile, null, '    '));
		const { models } = req.db;
		const role = await models.roles.findOne({ where: { name: 'client' } });

		let first_name='', 
				last_name='';
		if(profile.name) {
			first_name=profile.name.givenName;
			last_name=profile.name.familyName;
		}
		else {
			const nameParts = profile.displayName.split(' ');
			first_name = nameParts[0];
			last_name = R.slice(1,Infinity, nameParts);
		}

		let email_address;
		if(profile.emails) email_address=profile.emails[0].value;

		const filter = { provider_id: provider.id, provider};
		const data = {
			where: filter, defaults: {
				first_name,
				last_name,
				provider,
				provider_id: profile.id,
				email_address,
				role_id: role.id
			}
		};

		const user = await models.users.findOrCreate(data);
		user[0].role = role;
		done(null, user[0]);
	}
	catch (err) {
		done(err);
	}
};

module.exports = (app) => {

	passport.use('login-local', new LocalStrategy({ 
		passReqToCallback: true, 
		usernameField: 'email' 
	}, async (req, email, password, done) => {
		let user;
		try {
			logger.info('Looking for user');
			const filter = { where: { email_address: email, provider: 'local' }, include: [{ model: req.db.models.roles, as: 'role' }] };
			user = await req.db.models.users.findOne(filter);
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

	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.auth_jwt_secret,
		passReqToCallback: true
	}, async (req, payload, done) => {

		logger.debug(JSON.stringify(payload, null, '    '));
		if(req.path.startsWith('/admin')) {
			if(payload.isAdmin) return done(null, payload);
			else return done('You have no permissions to access this page');
		}
		return done(null, payload);
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
			await createOrFindUser(req, profile, 'facebook', done);
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
			await createOrFindUser(req, profile, 'google', done);
		}
	));

	passport.use('login-twitter', new TwitterStrategy(
		{
			clientID: process.env.auth_twitter_consumer_key,
			clientSecret: process.env.auth_twitter_consumer_secret,
			passReqToCallback: true,
			callbackURL: '/auth/twitter/callback'
		},
		async (req, accessToken, refreshToken, profile, done) => {
			await createOrFindUser(req, profile, 'twitter', done);
		}
	));

	passport.use('login-instagram', new InstagramStrategy(
		{
			clientID: process.env.auth_instagram_client_id,
			clientSecret: process.env.auth_instagram_client_secret,
			passReqToCallback: true,
			callbackURL: '/auth/instagram/callback'
		},
		async (req, accessToken, refreshToken, profile, done) => {
			console.log('============');
			console.log(profile);
			console.log('============');
			await createOrFindUser(req, profile, 'instagram', done);
		}
	));


	app.use(passport.initialize());
}
