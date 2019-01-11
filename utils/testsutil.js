const constants = require('configs/constantsconfig');

const getToken = (res) => {
	const token = res.headers[constants.TOKEN_NAME];
	return token;
}

module.exports = {
	getToken
}