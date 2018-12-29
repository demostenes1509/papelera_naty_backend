'use strict';

const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const Sequelize = require('sequelize');

module.exports = function (db) {

	const productspictures = db.define('productspictures', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		content_type: {
			type: Sequelize.STRING(50),
			allowNull: false
		}
	}, { 
		timestamps: false, 
		underscored: true,
		tableName: 'products_pictures'
	});

	return productspictures;
};