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
	
			logger.info('accessToken:'+accessToken);
			logger.info('refreshToken:'+refreshToken);
			logger.info('profile:'+JSON.stringify(profile,null,'   '));

			try {
				let user = await db.models.users.findOne({where: { facebook_id: profile.id } });
				if(user) {
					await user.update({
						token: accessToken
					});
				}
				else {
					const values = {
							first_name: profile.displayName, 
							provider: profile.provider, 
							facebook_token: accessToken
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
