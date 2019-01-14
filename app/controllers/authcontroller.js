const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const cypherutil = require("utils/cypherutil");
const { notEmptyValidation } = require("utils/validationutil");

module.exports = {

	/* create category */
	login: async (req, res) => {
		logger.info('Login');
		notEmptyValidation(req,['email','password']);

		const {email,password} = req.body;

		const user = await modelsutil.findOne(req,'users',{where: {email_address: email}});
		if(!user) throw new Error('Invalid username/password');

		logger.info('Validating password');
		if(user.password !== cypherutil(password)) {
			throw new Error('Invalid username/password');
		}

		logger.info('Assigning user to session');
		const { userSession } = req;
		userSession.user_id = user.id;
		await modelsutil.save(req,userSession);

		logger.info('Responding to user');
		const { first_name, last_name} = user;
		return res.status(200).send({first_name, last_name});
	}
		
}