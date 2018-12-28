'use strict';

const ma = require('module-alias/register');
const logger = require("@logger")(module);

const self = module.exports = {
	create : function (req,model,data) {
		return req.db.models[model].create(data,{transaction: req.trx});
	},
	
	findAll : function (req,model,filter) {
		return req.db.models[model].findAll(filter,{transaction: req.trx});
	},


}