var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');
var config = require('./authconfig');
var init = require('./init');

passport.use(new LinkedInStrategy(
	{
		consumerKey: config.linkedin.clientID,
		consumerSecret: config.linkedin.clientSecret,
		callbackURL: config.linkedin.callbackURL
	},
	(token, tokenSecret, profile, done) => {

		const searchQuery = {
			name: profile.displayName
		};

		const updates = {
			name: profile.displayName,
			someID: profile.id
		};

		const options = {
			upsert: true
		};

		// update the user if s/he exists or add a new user
		User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
			if (err) {
				return done(err);
			} else {
				return done(null, user);
			}
		});
	}

));

// serialize user into the session
init();


module.exports = passport;
