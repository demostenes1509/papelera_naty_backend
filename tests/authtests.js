const request = require('supertest');
const expect = require('expect');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

const login_as_user = (email) => {
	return request("http://localhost:" + process.env.app_http_port)
		.post('/login')
		.send({ email: email, password: 'maxi' })
		.expect(200);
};

const self = module.exports = {

	login_as_admin: () => {
		return login_as_user('mcarrizo@papeleranaty.com');
	},

	login: async () => {
		const response = await self.login_as_admin();
		
		const session = JSON.parse(response.text);
		expect(session.isLoggedIn).toBe(true);
		expect(session.isAdmin).toBe(true);
		expect(session.firstName).toBe('Maxi');
		expect(session.lastName).toBe('Admin');
	},

	login_invalid_email: async () => {
		return request("http://localhost:" + process.env.app_http_port)
			.post('/login')
			.send({ email: 'no@exists', password: 'maxi' })
			.expect(401);
	},

	login_invalid_password: async () => {
		return request("http://localhost:" + process.env.app_http_port)
			.post('/login')
			.send({ email: 'mcarrizo@papeleranaty.com', password: 'maxito' })
			.expect(401);
	},

	permission_error: async () => {
		const response = await request("http://localhost:" + process.env.app_http_port)
			.post('/admin/categories')
			.send({ username: 'Maxi Categoria', url: 'maxi-categoria' })
			.expect(500);

		const error = JSON.parse(response.text);
		expect(error.server_error).toBe('You have no permissions to access this page');
	},

	logout: async () => {
		const login = await self.login_as_admin();

		const response = await request("http://localhost:" + process.env.app_http_port)
			.post('/logout')
			.set(AUTHORIZATION, getBearerToken(login))
			.expect(200);

		const session = JSON.parse(response.text);
		expect(session.isLoggedIn).toBe(false);

	}
}

