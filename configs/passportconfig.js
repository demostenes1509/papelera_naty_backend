const logger = require("configs/loggerconfig")(module);
const passport = require('passport');
const FacebookSignedRequestStrategy = require('passport-facebook-signedrequest');
const LocalStrategy = require('passport-local').Strategy;
const cypherutil = require("utils/cypherutil");
const modelsutil = require("utils/modelsutil");

module.exports = (app, db) => {
	console.log('MEC>1');
	console.log('MEC>1.0:'+process.env.auth_facebook_client_id);
	console.log('MEC>1.1:'+process.env.auth_facebook_client_secret);
	passport.use(new FacebookSignedRequestStrategy({
		appId: process.env.auth_facebook_client_id,
		appSecret: process.env.auth_facebook_client_secret,
		userFields: ['first_name', 'last_name', 'name', 'id', 'email', 'picture']
	}, async (profile, done) => {
		console.log('MEC>1.1');
		if (profile) {
			try {
				console.log('MEC>1.2:'+JSON.stringify(profile));
				let user = await modelsutil.findOne(passport.req, 'users', { where: { facebook_id: profile.id } });
				if (user) {
					await user.update({
						token: profile.accessToken
					});
				}
				else {
					const role = await modelsutil.findOne(passport.req, 'roles', { where: { name: 'client' } });
					const values = {
						full_name: profile.displayName,
						provider: profile.provider,
						facebook_token: profile.accessToken,
						facebook_id: profile.id,
						email_address: profile.emails[0].value,
						role_id: role.id
					};

					user = await db.models.users.create(values);
					user = await modelsutil.create(this.req, 'users', values);
				}
				return done(null, user);
			}
			catch (err) {
				return done(err);
			}
		}
		else {
			return done(new Error('Token not valid'));
		}
	}));

		console.log('MEC>2');

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

	console.log('MEC>3');

	app.use(passport.initialize());
	app.use(passport.session());

	/*
	app.post('/login',passport.authenticate('local', { session: false }), (req, res, next) => {

			if (!req.user) {
				return next('Invalid username/password');
			}

			logger.info('Responding to user');
			const { first_name, last_name } = req.user;
			const isAdmin = req.user.role.name === 'admin';
			
			return res.status(200).send({isAdmin, firstName: first_name, lastName: last_name});

		},generateToken, sendToken);
		*/
}
