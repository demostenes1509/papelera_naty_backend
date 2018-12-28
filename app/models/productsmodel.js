'use strict';

const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const Sequelize = require('sequelize');
const categories = require('./categoriesmodel');

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
		}
	}, { timestamps: false, underscored: true });

	db.models.products.hasOne(db.models.categories, {
		as: 'category',
		foreignKey: 'category_id'
	});

	return products;
};