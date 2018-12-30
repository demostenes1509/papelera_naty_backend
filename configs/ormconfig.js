const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const Sequelize = require('sequelize');


module.exports = async (app) => {

	const { db_database, db_host, db_port, db_user, db_password, db_show_sql } = process.env;

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

	const sequelize = new Sequelize(db_database, db_user, db_password, options);
	
	sequelize.authenticate();

	const categories = require('../app/models/categoriesmodel.js')(sequelize);
	const products = require('../app/models/productsmodel.js')(sequelize);
	const packaging = require('../app/models/packagingmodel.js')(sequelize);
	const productsformats = require('../app/models/productsformatsmodel.js')(sequelize);
	const productspictures = require('../app/models/productspicturesmodel.js')(sequelize);

	// Add mappings
	categories.hasMany(products,{ foreignKey: 'category_id', required: true });
	products.belongsTo(packaging, { as: "packaging", required: true});
	products.belongsTo(categories, { as: "category", required: true});
	products.hasMany(productsformats,{ foreignKey: 'product_id', required: true });
	products.hasMany(productspictures,{ foreignKey: 'product_id', required: true });

	// Add sequelize on request
	app.use((req,res,next) => {
		req.db = sequelize;
		next();
	});

	return sequelize;
};