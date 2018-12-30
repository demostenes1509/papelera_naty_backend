const Sequelize = require('sequelize');

module.exports = function (db) {

	const products = db.define('products', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		url: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		is_visible: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		},
		is_offer: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	}, { 
		timestamps: false, 
		underscored: true 
	});

	return products;
};