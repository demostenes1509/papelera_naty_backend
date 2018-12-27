'use strict';

const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const Sequelize = require('sequelize');

module.exports = function (db) {
	return db.define('categories', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	}, { timestamps: false });
};