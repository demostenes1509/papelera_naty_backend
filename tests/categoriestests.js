const request = require('supertest');
const expect = require('expect');

module.exports = {

    create : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/categories')
            .send({name:'Maxi Categoria',url:'maxi-categoria'})
            .expect(200);	

        const category = JSON.parse(response.text);
        expect(category.name).toBe('Maxi Categoria');
	},

    create_with_name : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/categories')
            .expect(500);	

        const errors = JSON.parse(response.text);  
        expect(errors.server_error.length).toBe(2);
        expect(errors.server_error[0].msg).toBe('name is required');
        expect(errors.server_error[1].msg).toBe('url is required');
    },
    
    list : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/categories')
            .expect(200);	

        const categories = JSON.parse(response.text);
        expect(categories.length).toBe(36);
	}

}
