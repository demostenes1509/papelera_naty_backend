const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require('utils/modelsutil');
const { TOKEN_NAME } = require('configs/constantsconfig');

const updateTimestamp = async (req, userSession) => {
	logger.debug('Changing last access');
	await modelsutil.save(req,userSession,{last_access: new Date()});
}

const createSession = async (req,res) => {
	const token = jwt.sign({creation: new Date()}, jwtkey);

	logger.debug("Creating database session");
	const userSession = await modelsutil.create(req,'userssessions', {token: token, last_access: new Date()});
	
	logger.debug("Creating request session");
	req.session			= { isLoggedIn: false };
	req.userSession = userSession;

	logger.debug("Adding header to response");
	res.header(TOKEN_NAME,token);
}

const updateSession = async (req,res, userSession) => {
	req.userSession	= userSession;

	if(userSession.isLoggedIn) {
		logger.debug('User is logged in');
		const isAdmin = userSession.user.role.name==='admin';
		req.session = {isLoggedIn:true, isAdmin};
	}
	else {
		logger.debug('User is NOT logged in');
		req.session			= { isLoggedIn: false };
	}

	await updateTimestamp(req,userSession);
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
			logger.info("Session existing. Updating timestamp");
			await updateSession(req,res,userSession);
		}
		else {
			logger.info("Session missing. Recreating it");
			await createSession(req,res);
		}
	}
	else {
		logger.info("Creating session");
		await createSession(req,res);
	}
}

module.exports = (app) => {

	app.use(async (req,res,next) => {
		try {
			// Assign transaction to request
			req.trx = app.trx;
			logger.info('--------------------------');		
			await handleSession(req,res);
			next();
		}
		catch(err) {
			next(err);
		}
	});
};