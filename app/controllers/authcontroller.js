const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const { TOKEN_NAME } = require('configs/constantsconfig');

module.exports = {

	login: async (req, res) => {

		logger.info('Authentication finished. Checking results');
		if (!req.user) {
			throw new Error('Invalid username/password');
		}

		logger.info('Assigning user to session');
		const { userSession } = req;
		await modelsutil.save(req, userSession, { user_id: req.user.id });

		logger.info('Responding to user');
		const { first_name, last_name } = req.user;
		const isAdmin = req.user.role.name === 'admin';

		return res.status(200).send({ [TOKEN_NAME]: req.token, isLoggedIn: true, isAdmin, firstName: first_name, lastName: last_name });

	},
	
	logout: async (req,res) => {

		logger.info('Logout');
		const { userSession } = req;
		
		logger.debug('Removing user from session');
		await modelsutil.save(req,userSession,{user_id: null});

		logger.info('Responding to user');
		return res.status(200).send({[TOKEN_NAME]: req.token, isLoggedIn: false});

	}
		
}