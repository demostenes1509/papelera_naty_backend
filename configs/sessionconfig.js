const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const modelsutil = require("utils/modelsutil");

const createToken = async (req,res) => {
	logger.debug("Session has no token. Creating it");
	const token = jwt.sign({creation: new Date()}, jwtkey);

	logger.debug("Creating user session");
	const userSession = await modelsutil.create(req,'userssessions', {token: token, last_access: new Date()});
	
	logger.debug("Creating session");
	req.session			= { userSession: userSession, isLoggedIn:false };

	logger.debug("Adding header to response");
	res.header(req.constants.TOKEN_NAME,token);
}

module.exports = async (app) => {

	// Add sequelize on request
	app.use(async (req,res,next) => {

		if(!req.token) {
			await createToken(req,res);
		}
		next();
	});

};