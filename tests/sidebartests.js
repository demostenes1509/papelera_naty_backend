const request = require('supertest');
const expect = require('expect');

module.exports = {

    get : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/sidebar')
            .expect(200);	

            const sidebar = JSON.parse(response.text);
            // console.log(JSON.stringify(homeinfo,null,'  '));
            expect(sidebar).not.toBeNull();
            expect(sidebar.categories).not.toBeNull();
            expect(sidebar.categories).toHaveLength(4);
            expect(sidebar.offers).not.toBeNull();
            expect(sidebar.offers).toHaveLength(2);
	}

}
