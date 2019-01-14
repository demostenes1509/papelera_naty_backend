const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require("utils/modelsutil");

const updateTimestamp = async (req, userSession) => {
	logger.debug('Changing last access');
	
	userSession.last_access = new Date();
	await modelsutil.save(req,userSession);
 
	logger.debug("Creating request session");
	req.userSession	= userSession;
	req.session			= { isLoggedIn: false };
};

const createSession = async (req,res) => {
	logger.debug("Session has no token. Creating it");
	const token = jwt.sign({creation: new Date()}, jwtkey);

	logger.debug("Creating database session");
	const userSession = await modelsutil.create(req,'userssessions', {token: token, last_access: new Date()});
	
	logger.debug("Creating request session");
	req.session			= { isLoggedIn: false };
	req.userSession = userSession;

	logger.debug("Adding header to response");
	res.header(req.constants.TOKEN_NAME,token);
}

const updateSession = async (req,res, userSession) => {
	if(userSession.isLoggedIn) {
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
	else {
		await updateTimestamp(req,userSession);
	}
}

const handleSession = async (req, res) => {
	if(req.token) {
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
			logger.info('--------------------------');		
			await handleSession(req,res);
			next();
		}
		catch(err) {
			next(err);
		}
	});
};