'use strict';

const ma		= require('module-alias/register');
const logger	= require("@logger")(module);

module.exports = function (orm, db, models) {

	logger.debug("Configuring categories");
	models.cities = db.define("categories", { 
			id:				{ type: 'serial', key: true}, 
			name:			{ type: 'text', size: 100, required: true }
		},
		{
		}
	);	
};