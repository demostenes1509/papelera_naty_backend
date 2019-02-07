const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('./authconfig');
const init = require('./init');

passport.use(new GitHubStrategy(
	{
		clientID: config.github.clientID,
		clientSecret: config.github.clientSecret,
		callbackURL: config.github.callbackURL
	},
	(accessToken, refreshToken, profile, done) => {

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
		User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
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
