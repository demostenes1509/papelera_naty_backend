const request = require('supertest');
const expect = require('expect');

module.exports = {

    get_offers : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo,null,'  '));
        expect(homeinfo.products).not.toBeNull();
        expect(homeinfo.products).toHaveLength(2);
        expect(homeinfo.products[0].category).not.toBeNull();
        expect(homeinfo.products[0].packaging).not.toBeNull();
        expect(homeinfo.products[0].productsformats).not.toBeNull();
        expect(homeinfo.products[0].productsformats).toHaveLength(1);
        expect(homeinfo.products[0].productspictures).not.toBeNull();
        expect(homeinfo.products[0].productspictures).toHaveLength(1);
        expect(homeinfo.title).toBe('Ofertas de la semana');
    },
    
    get_category : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/aluminio')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo.products,null,'  '));
        expect(homeinfo.products).not.toBeNull();
        expect(homeinfo.products).toHaveLength(1);
        expect(homeinfo.products[0].category).not.toBeNull();
        expect(homeinfo.products[0].packaging).not.toBeNull();
        expect(homeinfo.products[0].productsformats).not.toBeNull();
        expect(homeinfo.products[0].productsformats).toHaveLength(22);
        expect(homeinfo.products[0].productspictures).not.toBeNull();
        expect(homeinfo.products[0].productspictures).toHaveLength(0);
        expect(homeinfo.title).toBe('Aluminio');

    },
    
    get_search : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/search/bols')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo.products,null,'  '));
        expect(homeinfo.products).not.toBeNull();
        expect(homeinfo.products).toHaveLength(7);
        expect(homeinfo.title).toBe('Resultados de bols');
	}

}
