const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const cypherutil = require("utils/cypherutil");
const { notEmptyValidation } = require("utils/validationutil");
const { TOKEN_NAME } = require('configs/constantsconfig');

module.exports = {

	/* create category */
	login: async (req, res) => {
		logger.info('Login');
		notEmptyValidation(req,['email','password']);

		const {email,password} = req.body;

		const params = {where: {email_address: email}, include: [ {model: req.db.models.roles, as: 'role'} ]};
		const user = await modelsutil.findOne(req,'users',params);
		if(!user) throw new Error('Invalid username/password');

		logger.info('Validating password');
		if(user.password !== cypherutil(password)) {
			throw new Error('Invalid username/password');
		}

		logger.info('Assigning user to session');
		const { userSession } = req;
		await modelsutil.save(req,userSession,{user_id: user.id});

		logger.info('Responding to user');
		const { first_name, last_name} = user;
		const isAdmin = user.role.name==='admin';
		return res.status(200).send({[TOKEN_NAME]: req.token, isLoggedIn: true, isAdmin, firstName: first_name, lastName: last_name});
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