const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require('utils/modelsutil');
const TokenNotPresentError = require('utils/exceptions/TokenNotPresentError')

const updateTimestamp = async (req, userSession) => {

	const now = new Date();
	const diff = userSession.last_access.valueOf() - now.valueOf();
	const diffInHours = Math.round(diff/1000/60/60); 

	if(diffInHours>23) {
		logger.debug('Changing last access');
		await modelsutil.save(req,userSession,{last_access: new Date()});
	}
}

const updateSession = async (req, userSession) => {
	req.userSession	= userSession;

	if(userSession.isLoggedIn) {
		logger.debug('User is logged in');
		const isAdmin = userSession.user.role.name==='admin';
		req.session = { isLoggedIn:true, isAdmin};
	}
	else {
		logger.debug('User is NOT logged in');
		req.session			= { isLoggedIn: false };
	}

	await updateTimestamp(req,userSession);
}

const handleSession = async (req) => {

	const token = req.token || req.query.state;
	if(token) {
		logger.debug('Token:'+token);
		jwt.verify(token, jwtkey);

		const filter = {
			where: {token}, 
			include: [ { model: req.db.models.users, as: 'user',
			include: [ {model: req.db.models.roles, as: 'role'} ] } ] 
		};
		const userSession = await modelsutil.findOne(req,'userssessions',filter);
		if(userSession) {
			logger.info("Session existing.");
			await updateSession(req, userSession);
		}
		else {
			throw new TokenNotPresentError('Token not existing in database');
		}
	}
}

module.exports = (app) => {

	app.use(async (req,res,next) => {
		try {
			// Assign transaction to request
			req.trx = app.trx;
			logger.info('-----------'+req.path+'---------------');
			if(req.path.startsWith('/token/')) {
				logger.info('Getting token');
			}
			else {
				await handleSession(req);
			}
			next();
		}
		catch(err) {
			next(err);
		}
	});
};