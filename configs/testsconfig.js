'use strict';

const modulealias = require('module-alias/register');
const logger = require('configs/loggerconfig')(module);
const appconfig = require('configs/appconfig');
const migrationconfig = require("@migrationconfig");
const Sequelize = require('sequelize');

const category = require(__dirname+'/../tests/categoriestests');
const home = require(__dirname+'/../tests/hometests');

describe('Test Suite', function() {
	
	var server;
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
