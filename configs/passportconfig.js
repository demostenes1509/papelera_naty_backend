const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const cypherutil = require("utils/cypherutil");
const modelsutil = require("utils/modelsutil");

module.exports = (app) => {

	passport.use('login-local',new LocalStrategy({passReqToCallback: true, session: false, usernameField: 'email' },async (req, email, password, done) => {
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

	passport.use('login-facebook', new FacebookStrategy(
		{
		clientID: process.env.auth_facebook_client_id,
		clientSecret: process.env.auth_facebook_client_secret,
		callbackURL: '/auth/facebook/callback',
		passReqToCallback: true,
		session: false,
		profileFields: ['id', 'email', 'first_name', 'last_name']
	},
		async (req, accessToken, refreshToken, profile, done) => {
			try {
				console.log('--------------');
				console.log(profile.name);
				console.log('--------------');
				const params = { where: { facebook_id: profile.id }, include: [{ model: req.db.models.roles, as: 'role' }] };
				let user = await modelsutil.findOne(req,'users',params);
				if(!user) {
					const role = await modelsutil.findOne(req,'roles',{where: { name: 'client' }});
					const values = {
							first_name: profile.name.givenName, 
							last_name: profile.name.familyName, 
							provider: 'facebook', 
							facebook_id: profile.id,
							email_address: profile.emails[0].value,
							role_id: role.id
					};
					user = await modelsutil.create(req,'users',values);
				}
				done(null,user);
			}
			catch(err) {
				done(err);
			}
		}
	));

	passport.use('login-google', new GoogleStrategy(
		{
			clientID: process.env.auth_google_client_id,
			clientSecret: process.env.auth_google_client_secret,
			passReqToCallback: true,
			callbackURL: '/auth/google/callback',
			session: false
		},
		async (req, accessToken, refreshToken, profile, done) => {

			try {
				console.log('--------------');
				console.log(JSON.stringify(profile,null,'    '));
				console.log('--------------');
				const params = { where: { google_id: profile.id }, include: [{ model: req.db.models.roles, as: 'role' }] };
				let user = await modelsutil.findOne(req,'users',params);
				if(!user) {
					const role = await modelsutil.findOne(req,'roles',{where: { name: 'client' }});
					const values = {
							first_name: profile.name.givenName, 
							last_name: profile.name.familyName, 
							provider: 'google', 
							google_id: profile.id,
							email_address: profile.email,
							role_id: role.id
					};
					user = await modelsutil.create(req,'users',values);
				}
				done(null,user);
			}
			catch(err) {
				done(err);
			}
		}
		));

	app.use(passport.initialize());
}
