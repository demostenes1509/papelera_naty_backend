const modulealias = require('module-alias/register');
const logger = require('@logger')(module);
const request = require('supertest');
const expect = require('expect');

const self = module.exports = {

    create : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/categories')
            .send({name:'Categoria 4'})
            .expect(200);	

        const category = JSON.parse(response.text);
        expect(category.name).toBe('Categoria 4');
	},

    create_with_name : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/categories')
            .expect(500);	
	}

}
