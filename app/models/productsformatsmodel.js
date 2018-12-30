const Sequelize = require('sequelize');

module.exports = function (db) {

	const productsformats = db.define('productsformats', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		format: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		units: {
			type: Sequelize.INTEGER,
			size: 8,
			allowNull: false
		},
		wholesale: {
			type: Sequelize.INTEGER,
			size: 8,
			allowNull: false
		},
		retail: {
			type: Sequelize.INTEGER,
			size: 8,
			allowNull: false
		}
	}, { 
		timestamps: false, 
		underscored: true,
		tableName: 'products_formats'
	});

	return productsformats;
};