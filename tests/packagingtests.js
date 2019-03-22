const request = require('supertest');
const expect = require('expect');

module.exports = {

	list: async () => {
		const response = await request("http://localhost:" + process.env.app_http_port)
			.get('/packaging')
			.expect(200);
		const packaging = JSON.parse(response.text);
		expect(packaging.length).toBe(5);
	}

}
