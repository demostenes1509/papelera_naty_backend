const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require("utils/modelsutil");

const createSession = async (req,res) => {
	logger.debug("Session has no token. Creating it");
	const token = jwt.sign({creation: new Date()}, jwtkey);

	logger.debug("Creating database session");
	const userSession = await modelsutil.create(req,'userssessions', {token: token, last_access: new Date()});
	
	logger.debug("Creating request session");
	req.session			= { userSession: userSession, isLoggedIn: false };

	logger.debug("Adding header to response");
	res.header(req.constants.TOKEN_NAME,token);
}

const updateSession = async (req,res, userSession) => {
	if(userSession.user_id) {


		/*
		req.session = {isLoggedIn:true, 
			user_id: user.id,
			full_name: user.fullName(), 
			is_admin: user.isAdmin(), 
			email_address: user.email_address, 
			first_name: user.first_name, 
			last_name: user.last_name};
			*/
	}

}

module.exports = (app) => {

	// Add sequelize on request
	app.use(async (req,res,next) => {

		logger.info('--------------------------');

		if(req.token) {

			// If there is an error, we will get an exception here
			try {
				jwt.verify(req.token, jwtkey);
			}
			catch(error) {
				return next(error);
			}

			const filter = {
				where: {token: req.token}, 
				include: [ { model: req.db.models.users, as: 'user',
					include: [ {model: req.db.models.roles, as: 'role'} ] } ] 
			};
			const userSession = await modelsutil.findOne(req,'userssessions',filter);
			if(userSession) {
				logger.debug("Session existing. Updating timestamp");
				await updateSession(req,res,userSession);
			}
			else {
				logger.debug("Session missing. Recreating it");
				await createSession(req,res);
			}
		}
		else {
			await createSession(req,res);
		}
		return next();
	});

};