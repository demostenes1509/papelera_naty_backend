'use strict';

const modulealias = require('module-alias/register');
const logger = require('@logger')(module);
const appconfig = require('@appconfig');
const migrationconfig = require("@migrationconfig");
const request = require('supertest');
const Sequelize = require('sequelize');

var server;

const category		= require(__dirname+'/../tests/categoriestests');
const home			= require(__dirname+'/../tests/hometests');

describe('Test Suite', function() {
	
	this.timeout(0);

	before(async () => {

		logger.info('Configuring app');
		const data = await appconfig(false);

		logger.info('Dropping changelog');
		await data.db.query('DROP TABLE IF EXISTS databasechangelog', { type: Sequelize.QueryTypes.SELECT });

		logger.info('Running migrations');
        await migrationconfig(data.db,'update');

		server = data.app.listen(process.env.app_http_port, function() {
			logger.info('Listening on port:'+server.address().port);
		});			


		/*
		Promise.resolve(appconfig())
		.then(data => {
			server = data.app.listen(process.env.app_http_port, function() {
				logger.info('Listening on port:'+server.address().port);
				done();
			});			
		})
		.catch(error => {
			done(error);
		});*/
	});
	
	beforeEach(function(done) {
        logger.info('---------------- Starting test -----------------');
		done();
	});	
	
    describe('Categories', function() {
		it('List categories', category.list);
        it('Create new Category', category.create);
        it('Create without name', category.create_with_name);
	});

    describe('Home', function() {
		it('Get Offers', home.get_offers);
	});


	after(function (){
		if(server) {
			logger.info('Stopping server');
			server.close();
			logger.info('Server stopped');
		}
	});
});
