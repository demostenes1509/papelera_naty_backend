const request = require('supertest');
const expect = require('expect');
const logger = require('configs/loggerconfig')(module);
const { getResponseToken, getBearerToken } = require('utils/testsutil');
const { AUTHORIZATION } = require('configs/constantsconfig');

module.exports = {

    get_token : async () => {

        logger.info('--- Create token condition ---');
        const response1 = await request("http://localhost:"+process.env.app_http_port)
            .get('/token/1')
            .expect(200);	

        const token1 = getResponseToken(response1);
        expect(token1).not.toBeNull();

        const parsed = JSON.parse(response1.text);
        expect(parsed.isLoggedIn).toBe(false);

        logger.info('--- Reusing token condition ---');
        const response2 = await request("http://localhost:"+process.env.app_http_port)
            .get('/token/2')
            .set(AUTHORIZATION,getBearerToken(response1))
            .expect(200);	

        const token2 = getResponseToken(response2);
        expect(token2).toEqual(token1);

        logger.info('--- Sending not existing token ---');
        const response3 = await request("http://localhost:"+process.env.app_http_port)
            .get('/token/3')
            .set(AUTHORIZATION,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGlvbiI6IjIwMTktMDEtMjNUMTQ6NDI6MjIuMTUyWiIsImlhdCI6MTU0ODI1NDU0Mn0.IQ8IrDc3GSe6SP_d4gbX2nmie_fGFSspDX3OwDTKJ54')
            .expect(200);	

        const token3 = getResponseToken(response3);
        expect(token3).not.toBeNull();
        expect(token3).not.toEqual(token1);

        logger.info('--- Sending invalid token ---');
        const response4 = await request("http://localhost:"+process.env.app_http_port)
            .get('/token/4')
            .set(AUTHORIZATION,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGlvbiI6IjIwMTktMDEtMjNUMTQ6NDI6MjIuMTUyWiIsImlhdCI6MTU0ODI1NDU0Mn0.IQ8IrDc3GSe6SP_d4gbX2nmie_fGFSspDX3Ow')
            .expect(500);	

        const error = JSON.parse(response4.text);
				expect(error.server_error).toBe('invalid signature');
    },

    getToken: async () => {
        return await request("http://localhost:"+process.env.app_http_port)
            .get('/token/1')
            .expect(200);	
    }
}
