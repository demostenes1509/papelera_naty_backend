const modulealias = require('module-alias/register');
const logger = require('@logger')(module);
const request = require('supertest');

const self = module.exports = {

    create : async function () {

        const response = await request("http://localhost:"+process.env.app_http_port)
            .post('/categories')
            .send({name:'Categoria 4'})
            .expect(200);	

	},

}
