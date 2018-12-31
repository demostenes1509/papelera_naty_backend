const request = require('supertest');
const expect = require('expect');

module.exports = {

    get_offers : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo,null,'  '));
        expect(homeinfo.offers).not.toBeNull();
        expect(homeinfo.offers).toHaveLength(3);
        expect(homeinfo.offers[0].category).not.toBeNull();
        expect(homeinfo.offers[0].packaging).not.toBeNull();
        expect(homeinfo.offers[0].productsformats).not.toBeNull();
        expect(homeinfo.offers[0].productsformats).toHaveLength(9);
        expect(homeinfo.offers[0].productspictures).not.toBeNull();
        expect(homeinfo.offers[0].productspictures).toHaveLength(0);

	}

}
