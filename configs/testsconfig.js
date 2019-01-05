require('dotenv-flow').config();
const logger = require('configs/loggerconfig')(module);
const appconfig = require('configs/appconfig');
const migrationconfig = require("configs/migrationconfig");
const Sequelize = require('sequelize');
const { describe, before, it, after } = require('mocha');
const { category, sidebar, footer, home } = require('tests');

describe('Test Suite', function () {

	var server;
	this.timeout(0);

	before(async () => {

		logger.info('Configuring app');
		const data = await appconfig(false);

		logger.info('Dropping changelog');
		await data.db.query('DROP TABLE IF EXISTS databasechangelog', { type: Sequelize.QueryTypes.SELECT });

		logger.info('Running migrations');
		await migrationconfig(data.db, 'update');

		server = data.app.listen(process.env.app_http_port, function () {
			logger.info('Listening on port:' + server.address().port);
		});
	});

	describe('Categories Tests', function () {
		it('List categories', category.list);
		it('Create new Category', category.create);
		it('Create without name', category.create_with_name);
	});

	describe('Home Tests', function () {
		it('Get Offers', home.get_offers);
		it('Get Category', home.get_category);
		it('Get Search', home.get_search);
	});

	describe('Footer Tests', function () {
		it('Get footer', footer.get);
	});

	describe('Sidebar Tests', function () {
		it('Get sidebar', sidebar.get);
	});

	after(function () {
		if (server) {
			logger.info('Stopping server');
			server.close();
			logger.info('Server stopped');
		}
	});
});
