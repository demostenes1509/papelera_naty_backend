'use strict';

const ma = require('module-alias/register');
const logger = require("@logger")(module);

const self = module.exports = {
	create : function (req,model,data) {
		return req.models[model].create(data,{transaction: req.trx});
	},
	
	find : function (model,filter) {
		// filter.active=null;
	    return new Promise((resolve,reject) => {
			model.find(filter,(err,newobject) => {
				if(err) reject(err);
				// if(newobject) {
				// 	for(var i=0;i<newobject.length;i++) {
				// 		newobject[i].active = undefined;
				// 	}				
				// }
				resolve(newobject);
			});
		});
	},


}