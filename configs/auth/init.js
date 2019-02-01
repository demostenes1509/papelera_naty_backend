var passport = require('passport');

module.exports = (db) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
		try {
			const params = {where: {id}, include: [ {model: db.models.roles, as: 'role'} ]};
			const user = await db.models.users.findOne(params);
			done(null,user)
		}
		catch(err) {
			done(err);
		}
  });
};
