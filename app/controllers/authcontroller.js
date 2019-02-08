const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const { TOKEN_NAME } = require('configs/constantsconfig');
const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';

module.exports = {

	login: async (req, res) => {

		logger.info('Authentication finished. Checking results');
		if (!req.user) {
			throw new Error('Invalid username/password');
		}

		const token = jwt.sign({creation: new Date()}, jwtkey);

		logger.debug("Creating database session");
		await modelsutil.create(req,'userssessions', {token: token, last_access: new Date(), user_id: req.user.id });

		logger.info('Responding to user');
		const { first_name, last_name } = req.user;
		const isAdmin = req.user.role.name === 'admin';

		return res.status(200).send({ [TOKEN_NAME]: token, isLoggedIn: true, isAdmin, firstName: first_name, lastName: last_name });
	},
	
	logout: async (req,res) => {

		logger.info('Logout');
		const { userSession } = req;
		
		logger.debug('Removing session');
		await modelsutil.destroy(req,'userssessions',{where: {id: userSession.id} });

		logger.info('Responding to user');
		return res.status(200).send({isLoggedIn: false});
	}
		
}