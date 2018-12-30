const Sequelize = require('sequelize');

module.exports = function (db) {

	const packaging = db.define('packaging', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	}, { 
		timestamps: false, 
		underscored: true,
		tableName: 'packaging'
	});

	return packaging;
};