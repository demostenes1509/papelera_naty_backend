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

	const response = {
		first_name: req.user.first_name,
		last_name: req.user.last_name,
		socket_id: req.user.
		isAdmin: req.user.role.name === 'admin'
	};

	logger.info('Responding to user');
	const token = jwt.sign(response, process.env.auth_jwt_secret);
	
	return token;
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