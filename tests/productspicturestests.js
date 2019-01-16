const request = require('supertest');
const expect = require('expect');

module.exports = {

    get : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/productspictures/1')
            .expect(200);	

    },

    get_not_found : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/productspictures/2')
            .expect(200);	
    }
    

}
