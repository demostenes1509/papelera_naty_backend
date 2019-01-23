const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require('utils/modelsutil');
const { TOKEN_NAME } = require('configs/constantsconfig');

const updateTimestamp = async (req, userSession) => {

	const now = new Date();
	const diff = userSession.last_access.valueOf() - now.valueOf();
	const diffInHours = Math.round(diff/1000/60/60); 

	if(diffInHours>23) {
		logger.debug('Changing last access');
		await modelsutil.save(req,userSession,{last_access: new Date()});
	}
}

const createSession = async (req) => {
	const token = jwt.sign({creation: new Date()}, jwtkey);

	logger.debug("Creating database session");
	await modelsutil.create(req,'userssessions', {token: token, last_access: new Date()});
	
	logger.debug("Adding header to response");
	return {
		[TOKEN_NAME]: token,
		isLoggedIn: false
	};
}

const updateSession = async (req, res, token, userSession) => {

	await updateTimestamp(req,userSession);
	if(userSession.isLoggedIn) {
		logger.debug('User is logged in');
		const isAdmin = userSession.user.role.name==='admin';
		return {[TOKEN_NAME]: token, isLoggedIn:true, isAdmin, firstName: userSession.user.first_name, lastName: userSession.user.last_name};
	}
	else {
		logger.debug('User is NOT logged in');
		return {[TOKEN_NAME]: token, isLoggedIn: false };
	}
}

const handleSession = async (req, res) => {

	if(req.token) {
		logger.debug('Token:'+req.token);
		jwt.verify(req.token, jwtkey);

		const filter = {
			where: {token: req.token}, 
			include: [ { model: req.db.models.users, as: 'user',
				include: [ {model: req.db.models.roles, as: 'role'} ] } ] 
		};
		const userSession = await modelsutil.findOne(req,'userssessions',filter);
		if(userSession) {
			logger.info("Session existing.");
			return await updateSession(req,res,req.token,userSession);
		}
		else {
			logger.info("Session missing. Recreating it");
			return await createSession(req);
		}
	}
	else {
		logger.info("Creating session");
		return await createSession(req);
	}
}

module.exports = {

	/* get token if no token was provided or incoming token is invalid */
	get: async (req, res) => {
		const session = await handleSession(req,res);
		return res.status(200).send(session);		
	}
		
}