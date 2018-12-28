const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const Sequelize = require('sequelize');


module.exports = (app) => {
	
	return new Promise((resolve,reject) => {

		const { db_database, db_host, db_port, db_user, db_password } = process.env;

		const sequelize = new Sequelize(db_database, db_user, db_password, {
			host: db_host,
			dialect: 'postgres',
			operatorsAliases: false,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		});
	  
		sequelize.authenticate()
		.then(() => {

			const categories = require('../app/models/categoriesmodel.js')(sequelize);
			const products = require('../app/models/productsmodel.js')(sequelize);

			// Add mappings
			// products.hasOne(categories, { foreignKey: 'category_id', required: true });
			categories.hasMany(products,{ foreignKey: 'category_id', required: true });

			app.use((req,res,next) => {
				req.db = sequelize;
				next();
			});
			resolve(sequelize);
		})
		.catch(err => {
			reject(err);
		});
    });
};