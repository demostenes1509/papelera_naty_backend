const request = require('supertest');
const expect = require('expect');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    get : async () => {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/static/productspictures/1.jpg')
            .expect(200);	

    },

    get_not_found : async () => {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/productspictures/2')
            .expect(200);	
    }
    

}
