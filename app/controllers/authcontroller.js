const logger = require("configs/loggerconfig")(module);
const jwt = require('jsonwebtoken');
const { TOKEN_NAME } = require('configs/constantsconfig');

const getResponse = async(req) => {

	logger.info('Authentication finished. Creating token');
	logger.debug(JSON.stringify(req.user,null,'   '));
	const response = {
		id: req.user.id,
		firstName: req.user.first_name,
		lastName: req.user.last_name,
		isAdmin: req.user.role.name === 'admin'
	};

	logger.info('Responding to user');
	const token = jwt.sign(response, process.env.auth_jwt_secret);
	
	return { [TOKEN_NAME]: token };
}

module.exports = {

	social: async (req, res) => {

		const socket_id = req.query.state;
		const response = await getResponse(req);
		const io = req.app.get('io');
		io.in(socket_id).emit(req.user.provider, response);
		res.end()
	},

	login: async (req, res) => {

		const response = await getResponse(req);
		return res.status(200).send(response);
	}
		
}