const request = require('supertest');
const expect = require('expect');

const login_as_user = (email) => {
    return request("http://localhost:"+process.env.app_http_port)
    .post('/login')
    .send({ email : email, password : 'maxi' })
    .expect(200);        
};

const self = module.exports = {

    login_as_admin : function () {
		return login_as_user('mcarrizo@papeleranaty.com');
	},    

    login : async function () {
		const response = await self.login_as_admin();
        const user = JSON.parse(response.text);
		expect(user.first_name).toBe('Maxi');
		expect(user.last_name).toBe('Admin');
    },
    
    login_invalid_email : async function () {
        return request("http://localhost:"+process.env.app_http_port)
        .post('/login')
        .send({ email : 'no@exists', password : 'maxi' })
        .expect(500);   
    },
    
    login_invalid_password : async function () {
        return request("http://localhost:"+process.env.app_http_port)
        .post('/login')
        .send({ email : 'mcarrizo@papeleranaty.com', password : 'maxito' })
        .expect(500);   
    }
    
}
