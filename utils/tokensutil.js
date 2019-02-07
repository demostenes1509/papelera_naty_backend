const jwt = require('jsonwebtoken');
const jwtkey = '28b001fe-4fae-470e-9d35-fe2a7ad12425';
const { AUTHORIZATION } = require('configs/constantsconfig');

var createToken = function (auth) {
	return jwt.sign(
		{
			id: auth.id
		}, jwtkey,
		{
			expiresIn: 60 * 120
		}
	);
};

module.exports = {
	generateToken: function (req, res, next) {
		req.token = createToken(req.auth);
		return next();
	},
	sendToken: function (req, res) {
		res.setHeader(AUTHORIZATION, req.token);
		return res.status(200).send(JSON.stringify(req.user));
	}
};
