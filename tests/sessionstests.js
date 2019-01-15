const request = require('supertest');
const expect = require('expect');
const { getToken, getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    create_session : async function () {

        console.log('PRUEBA:'+AUTHORIZATION);

        const response1 = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            .expect(200);	

        const token1 = getToken(response1);
        expect(token1).not.toBeNull();

        const response2 = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            .set(AUTHORIZATION,getBearerToken(response1))
            .expect(200);	

        const token2 = getToken(response2);
        expect(token2).toBeUndefined();
    },

    permission_error: async function() {

        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/admin/categories')
            .send({name:'Maxi Categoria',url:'maxi-categoria'})
            .expect(500);	

        const error = JSON.parse(response.text);
        expect(error.server_error).toBe('You have no permissions to access this page');
    }

}
