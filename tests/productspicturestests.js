const request = require('supertest');
const expect = require('expect');
const { getToken } = require('./tokentests');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    get : async () => {
        const token = await getToken();
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/static/productspictures/1.jpg')
            .expect(200);	

    },

    get_not_found : async () => {
        const token = await getToken();
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/productspictures/2')
            .set(AUTHORIZATION,getBearerToken(token))
            .expect(200);	
    }
    

}
