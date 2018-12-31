const request = require('supertest');
const expect = require('expect');

module.exports = {

    get : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/footer')
            .expect(200);	

        const footer = JSON.parse(response.text);
        expect(footer).not.toBeNull();
        expect(footer.categories).not.toBeNull();
        expect(footer.categories).toHaveLength(36);

	}

}
