const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const { TOKEN_NAME } = require('configs/constantsconfig');
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';


const updateSession = async(req) => {

	logger.info('Authentication finished. Checking results');
	if (!req.user) {
		throw new Error('Invalid username/password');
	}

	logger.debug(JSON.stringify(req.user,null,'   '));

	logger.info('Assigning user to session');
	const { userSession } = req;
	await modelsutil.save(req,userSession,{user_id: req.user.id});

	logger.info('Responding to user');
	const { first_name, last_name } = req.user;
	const isAdmin = req.user.role.name === 'admin';

	return { isLoggedIn: true, isAdmin, firstName: first_name, lastName: last_name };
}

module.exports = {

	social: async (req, res) => {

		const { userSession } = req;
		const response = await updateSession(req);

		const io = req.app.get('io');
		io.in(userSession.socket_id).emit(req.user.provider, response);
		res.end()
	},

	login: async (req, res) => {

		const response = await updateSession(req);
		return res.status(200).send(response);
	},
	
	logout: async (req,res) => {

		logger.info('Logout');
		const { userSession } = req;
		
		logger.debug('Removing user from session');
		await modelsutil.save(req,userSession,{user_id: null});

		logger.info('Responding to user');
		return res.status(200).send({ isLoggedIn: false});
	}
		
}