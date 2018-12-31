const request = require('supertest');
const expect = require('expect');

module.exports = {

    get_offers : async function () {
        const response = await request("http://localhost:"+process.env.app_http_port)
            .get('/')
            .expect(200);	

        const homeinfo = JSON.parse(response.text);
        // console.log(JSON.stringify(homeinfo,null,'  '));
        expect(homeinfo.sidebar).not.toBeNull();
        expect(homeinfo.sidebar.sidebarCategories).not.toBeNull();
        expect(homeinfo.sidebar.sidebarCategories).toHaveLength(4);
        expect(homeinfo.sidebar.sidebarOffers).not.toBeNull();
        expect(homeinfo.sidebar.sidebarOffers).toHaveLength(2);
        expect(homeinfo.container).not.toBeNull();
        expect(homeinfo.container).toHaveLength(3);
        expect(homeinfo.container[0].category).not.toBeNull();
        expect(homeinfo.container[0].packaging).not.toBeNull();
        expect(homeinfo.container[0].productsformats).not.toBeNull();
        expect(homeinfo.container[0].productsformats).toHaveLength(9);
        expect(homeinfo.container[0].productspictures).not.toBeNull();
        expect(homeinfo.container[0].productspictures).toHaveLength(0);
        expect(homeinfo.footer).not.toBeNull();
        expect(homeinfo.footer.footerCategories).not.toBeNull();
        expect(homeinfo.footer.footerCategories).toHaveLength(4);

	}

}
