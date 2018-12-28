'use strict';

const modulealias = require('module-alias/register');
const logger = require('@logger')(module);
const appconfig = require('@appconfig');
const request = require('supertest');

var server,db,trx;

const category		= require(__dirname+'/../tests/categories_tests');

describe('Test Suite', function() {
	
	this.timeout(0);

	before(function(done) {
		
		logger.info("Initiating app");
		
		appconfig((error,app,dbx) => {
			if(error) {
				return done(error);
			}
			db = dbx;
			server	= app.listen(process.env.app_http_port, function() {
				logger.info('Listening on port:'+server.address().port);
				return done();
			});			
		});
	});
	
	beforeEach(function(done) {
        logger.info('---------------- Starting test -----------------');
		done();
	});	
    
    describe('Categories', function() {
		it('List categories', category.list);
		it('List categories and products', category.list_categories_and_products);

        it('Create new Category', category.create);
        it('Create without name', category.create_with_name);
    });

	after(function (){
 		
 		logger.info('Stopping server');
		server.close();
		logger.info('Server stopped');

	});
});
