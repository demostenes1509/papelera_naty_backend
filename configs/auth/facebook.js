const logger = require("configs/loggerconfig")(module);
var passport = require('passport');
var FacebookSignedRequestStrategy = require('passport-facebook-signedrequest');
var config = require('./authconfig');
// var init = require('./init');


passport.use(new FacebookSignedRequestStrategy({
	appId: 'config.facebook.clientId',
	appSecret: config.facebook.clientSecret,
	userFields: ['first_name','last_name','name','id','email','picture']
},
	function (user, done) {
		if (user)
			return done(null, user);
		else
			return done(new Error('Token not valid'));
	}
));


module.exports = passport;