const request = require('supertest');
const expect = require('expect');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    get : async () => {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/sidebar')
            .expect(200);	

            const sidebar = JSON.parse(response.text);
            // console.log(JSON.stringify(homeinfo,null,'  '));
            expect(sidebar).not.toBeNull();
            expect(sidebar.categories).not.toBeNull();
            expect(sidebar.categories).toHaveLength(4);
            expect(sidebar.offers).not.toBeNull();
            expect(sidebar.offers).toHaveLength(2);
	}

}
