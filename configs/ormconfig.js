const logger = require('configs/loggerconfig')(module);
const Sequelize = require('sequelize');
const colors = require('sequelize-log-syntax-colors');

module.exports = async (app) => {

	const { db_database, db_host, db_user, db_password, db_show_sql } = process.env;

	const options = {
		host: db_host,
		dialect: 'postgres',
		operatorsAliases: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	};

	if(db_show_sql==='false') options.logging = false;
	else {
		options.logging = (text) => { 
			console.log(colors(text)); 
		};
	}

	const sequelize = new Sequelize(db_database, db_user, db_password, options);

	logger.debug('Authenticating sequelize');
	sequelize.authenticate();

	logger.debug('Defining entities');
	const categories = require('../app/models/categoriesmodel.js')(sequelize);
	const products = require('../app/models/productsmodel.js')(sequelize);
	const packaging = require('../app/models/packagingmodel.js')(sequelize);
	const productsformats = require('../app/models/productsformatsmodel.js')(sequelize);
	const productspictures = require('../app/models/productspicturesmodel.js')(sequelize);
	const users = require('../app/models/usersmodel.js')(sequelize);
	const roles = require('../app/models/rolesmodel.js')(sequelize);

	logger.debug('Definig mappings');
	categories.hasMany(products,{ foreignKey: 'category_id', required: true });
	products.belongsTo(packaging, { foreignKey: 'packaging_id', as: 'packaging', required: true});
	products.belongsTo(categories, {foreignKey: 'category_id', as: 'category', required: true});
	products.hasMany(productsformats,{ foreignKey: 'product_id', as: 'productsformats', required: true });
	products.hasMany(productspictures,{ foreignKey: 'product_id', as: 'productspictures', required: true });

	users.belongsTo(roles, {foreignKey: 'role_id', as: 'role', required: true});

	// Add sequelize on request
	app.use((req,res,next) => {
		req.db = sequelize;
		next();
	});

	return sequelize;
};