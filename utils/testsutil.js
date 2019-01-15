const { TOKEN_NAME } = require('configs/constantsconfig');

const getToken = (res) => {
	const token = res.headers[TOKEN_NAME];
	return token;
}

const getBearerToken = (res) => {
	const token = getToken(res);
	return `Bearer ${token}`;
}

module.exports = {
	getToken,
	getBearerToken
}