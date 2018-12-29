const modulealias = require('module-alias/register');
const logger = require('@logger')(module);
const request = require('supertest');
const expect = require('expect');

const self = module.exports = {

    get_offers : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo));
        expect(homeinfo.container).not.toBeNull();
        expect(homeinfo.sidebar).not.toBeNull();
        expect(homeinfo.sidebar).toHaveLength(4);
	}

}
