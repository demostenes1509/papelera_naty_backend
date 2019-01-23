const request = require('supertest');
const expect = require('expect');
const { getToken } = require('./tokentests');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    get : async function () {
        const token = await getToken();
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/footer')
            .set(AUTHORIZATION,getBearerToken(token))
            .expect(200);	

        const footer = JSON.parse(response.text);
        expect(footer).not.toBeNull();
        expect(footer.categories).not.toBeNull();
        expect(footer.categories).toHaveLength(36);

	}

}
