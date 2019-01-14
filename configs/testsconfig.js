require('dotenv-flow').config();
const logger = require('configs/loggerconfig')(module);
const appconfig = require('configs/appconfig');
const migrationconfig = require("configs/migrationconfig");
const Sequelize = require('sequelize');
const { describe, before, it, after, beforeEach, afterEach } = require('mocha');
const { category, sidebar, footer, home, session } = require('tests');

describe('Test Suite', function () {

	var server;
	var data;
	this.timeout(0);

	before(async () => {

		logger.info('Configuring app');
		data = await appconfig(false);

		logger.info('Dropping changelog');
		await data.db.query('DROP TABLE IF EXISTS databasechangelog', { type: Sequelize.QueryTypes.SELECT });

		logger.info('Running migrations');
		await migrationconfig(data.db, 'update');

		server = data.app.listen(process.env.app_http_port, function () {
			logger.info('Listening on port:' + server.address().port);
		});
	});

	beforeEach(async () => {
		logger.debug('Creating transaction');
		data.app.trx = await data.db.transaction();
	});

	afterEach(async () => {
		logger.debug('Rollbacking transaction');
		await data.app.trx.rollback();
	});

	describe('Categories Tests', function () {
		it('List categories', category.list);
		it('Create new Category', category.create);
		it('Create without name', category.create_without_name);
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

	describe('Sessions Tests', function () {
		it('Creates a new session', session.create_session);
	});


	after(function () {
		if (server) {
			logger.info('Stopping server');
			server.close();
			logger.info('Server stopped');
		}
	});
});
