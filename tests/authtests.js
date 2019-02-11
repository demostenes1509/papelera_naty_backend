const request = require('supertest');
const expect = require('expect');
const { getBearerToken } = require('utils/testsutil');
// const { AUTHORIZATION, TOKEN_NAME } = require('configs/constantsconfig');
const jwt = require('jsonwebtoken');

const login_as_user = (email) => {
	return request("http://localhost:" + process.env.app_http_port)
		.post('/auth/local')
		.send({ email: email, password: 'maxi' })
		.expect(200);
};

const self = module.exports = {

	login_as_admin: () => {
		return login_as_user('mcarrizo@papeleranaty.com');
	},

	login: async () => {
		const response = await self.login_as_admin();
		
		const token = getBearerToken(response).replace('Bearer ','');
		const payload = jwt.verify(token,process.env.auth_jwt_secret);
		expect(payload.firstName).toBe('Maxi');
		expect(payload.lastName).toBe('Admin');
		expect(payload.isAdmin).toBe(true);
	},

	login_invalid_email: async () => {
		return request("http://localhost:" + process.env.app_http_port)
			.post('/auth/local')
			.send({ email: 'no@exists', password: 'maxi' })
			.expect(401);
	},

	login_invalid_password: async () => {
		return request("http://localhost:" + process.env.app_http_port)
			.post('/auth/local')
			.send({ email: 'mcarrizo@papeleranaty.com', password: 'maxito' })
			.expect(401);
	},

	permission_error: async () => {
		const response = await request("http://localhost:" + process.env.app_http_port)
			.post('/admin/categories')
			.send({ username: 'Maxi Categoria', url: 'maxi-categoria' })
			.expect(401);

			console.log(response.text);
		// const error = JSON.parse(response.text);
		expect(response.text).toBe('Unauthorized');
	}
}

