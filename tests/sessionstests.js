const request = require('supertest');
const expect = require('expect');
const testsutils = require('utils/testsutil');
const constants = require('configs/constantsconfig');

module.exports = {

    create_session : async function () {
        const response1 = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            .expect(200);	

        const token1 = testsutils.getToken(response1);
        expect(token1).not.toBeNull();

        const response2 = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            // .set('Authorization',`Bearer ${token1}`)
            .expect(200);	

        const token2 = testsutils.getToken(response2);
        expect(token2).toBeNull();
	}

}
