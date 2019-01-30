var passport = require('passport');

module.exports = (db) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
		try {
			const user = await db.models.users.findById(id);
			done(null,user)
		}
		catch(err) {
			done(err);
		}
  });
};
