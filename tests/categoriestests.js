const request = require('supertest');
const expect = require('expect');
const { login_as_admin } = require('./authtests');
const { getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    create : async () => {

        const login = await login_as_admin();
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/admin/categories')
            .set(AUTHORIZATION,getBearerToken(login))
            .send({name:'Maxi Categoria',url:'maxi-categoria'})
            .expect(200);	

        const category = JSON.parse(response.text);
        expect(category.name).toBe('Maxi Categoria');
	},

    create_without_name : async () => {

        const login = await login_as_admin();
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/admin/categories')
            .set(AUTHORIZATION,getBearerToken(login))
            .expect(500);	

        const errors = JSON.parse(response.text);  
        expect(errors.server_error.length).toBe(2);
        expect(errors.server_error[0].msg).toBe('name is required');
        expect(errors.server_error[1].msg).toBe('url is required');
    },
    
    list : async () => {

        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            .expect(200);
        const categories = JSON.parse(response.text);
        expect(categories.length).toBe(36);
	}

}
