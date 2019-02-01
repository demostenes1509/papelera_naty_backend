const logger = require("configs/loggerconfig")(module);
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./authconfig');
var init = require('./init');

module.exports = (db) => {

	passport.use(new FacebookStrategy(
		{
			clientID: config.facebook.clientId,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			profileFields: ['id', 'displayName', 'photos', 'email']
		},
		async (accessToken, refreshToken, profile, done) => {
	
			logger.debug('accessToken:'+accessToken);
			logger.debug('refreshToken:'+refreshToken);
			logger.debug('profile:'+JSON.stringify(profile,null,'   '));

			try {
				let user = await db.models.users.findOne({where: { facebook_id: profile.id } });
				if(user) {
					await user.update({
						token: accessToken
					});
				}
				else {
					const role = await db.models.roles.findOne({where: { name: 'client' }});
					const values = {
							full_name: profile.displayName, 
							provider: profile.provider, 
							facebook_token: accessToken,
							facebook_id: profile.id,
							email_address: profile.emails[0].value,
							role_id: role.id
					};

					user = await db.models.users.create(values);
				}
				done(null,user);
			}
			catch(err) {
				done(err);
			}
		}
	));
	
	init(db);

	return passport;

};
