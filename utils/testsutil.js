const { TOKEN_NAME } = require('configs/constantsconfig');

const getResponseToken = (res) => {
	const token = JSON.parse(res.text)[TOKEN_NAME];
	return token;
}

const getBearerToken = (res) => {
	const token = getResponseToken(res);
	return `Bearer ${token}`;
}

module.exports = {
	getResponseToken,
	getBearerToken
}