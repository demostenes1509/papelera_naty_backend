const request = require('supertest');
const expect = require('expect');
const { getToken } = require('./tokentests');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

const login_as_user = (email,token) => {
	return request("http://localhost:" + process.env.app_http_port)
		.post('/login')
		.set(AUTHORIZATION, getBearerToken(token))
		.send({ username: email, password: 'maxi' })
		.expect(200);
};

const self = module.exports = {

	login_as_admin: (token) => {
		return login_as_user('mcarrizo@papeleranaty.com',token);
	},

	login: async () => {
		const token = await getToken();
		const response = await self.login_as_admin(token);
		
		const session = JSON.parse(response.text);
		expect(session.isLoggedIn).toBe(true);
		expect(session.isAdmin).toBe(true);
		expect(session.firstName).toBe('Maxi');
		expect(session.lastName).toBe('Admin');
	},

	login_invalid_email: async () => {
		const token = await getToken();
		return request("http://localhost:" + process.env.app_http_port)
			.post('/login')
			.set(AUTHORIZATION, getBearerToken(token))
			.send({ username: 'no@exists', password: 'maxi' })
			.expect(500);
	},

	login_invalid_password: async () => {
		const token = await getToken();
		return request("http://localhost:" + process.env.app_http_port)
			.post('/login')
			.set(AUTHORIZATION, getBearerToken(token))
			.send({ username: 'mcarrizo@papeleranaty.com', password: 'maxito' })
			.expect(500);
	},

	permission_error: async () => {
		const token = await getToken();
		const response = await request("http://localhost:" + process.env.app_http_port)
			.post('/admin/categories')
			.set(AUTHORIZATION, getBearerToken(token))
			.send({ username: 'Maxi Categoria', url: 'maxi-categoria' })
			.expect(500);

		const error = JSON.parse(response.text);
		expect(error.server_error).toBe('You have no permissions to access this page');
	},

	logout: async () => {
		const token = await getToken();
		await self.login_as_admin(token);

		const response = await request("http://localhost:" + process.env.app_http_port)
			.post('/logout')
			.set(AUTHORIZATION, getBearerToken(token))
			.expect(200);

		const session = JSON.parse(response.text);
		expect(session.isLoggedIn).toBe(false);

	}
}
