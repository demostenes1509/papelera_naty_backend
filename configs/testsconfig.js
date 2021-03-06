require('dotenv-flow').config();
const logger = require('configs/loggerconfig')(module);
const appconfig = require('configs/appconfig');
const migrationconfig = require("configs/migrationconfig");
const Sequelize = require('sequelize');
const { describe, 
	before, 
	it,
	after, 
	beforeEach, 
	afterEach } = require('mocha');
const { category, 
				packaging,
				sidebar, 
				footer, 
				home, 
				auth } = require('tests');

const runTest = (id,label,func) => {
	if(process.env.TESTTORUN) {
		if(process.env.TESTTORUN===id) {
			it(label, func);
		}
	} 
	else {
		it(label, func);
	}
}

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
		await migrationconfig('update');

		server = data.app.listen(process.env.app_http_port, () => {
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

	describe('Categories Tests', () => {
		runTest('catlist','List categories', category.list);
		runTest('catcreate','Create new Category', category.create);
		runTest('catcreatewithoutname','Create without name', category.create_without_name);
	});

	describe('Packaging Tests', () => {
		runTest('packlist','List packaging', packaging.list);
	});

	// describe('Products Pictures Tests', () => {
	// 	runTest('ppget','Get picture', productpicture.get);
	// 	runTest('ppgetnotfound','Get picture not found', productpicture.get_not_found);
	// });

	describe('Home Tests',  ()  => {
		runTest('homeoffersget','Get Offers', home.get_offers);
		runTest('homecatsget','Get Category', home.get_category);
		runTest('homesearchget','Get Search', home.get_search);
	});

	describe('Footer Tests', () => {
		runTest('footerget','Get footer', footer.get);
	});

	describe('Sidebar Tests', () => {
		runTest('sidebarget','Get sidebar', sidebar.get);
	});

	describe('Auth Tests', () => {
		runTest('login','Login', auth.login);
		runTest('logininvaliduser','Login with invalid username', auth.login_invalid_email);
		runTest('logininvalidpassword','Login with invalid password', auth.login_invalid_password);
		runTest('permissionerror','Permission Error', auth.permission_error);
	});

	after( () => {
		if (server) {
			logger.info('Stopping server');
			server.close();
			logger.info('Server stopped');
		}
	});
});
