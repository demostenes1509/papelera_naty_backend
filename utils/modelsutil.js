'use strict';

const ma			= require('module-alias/register');
const logger		= require("@logger")(module);
// const dateFormat	= require('dateformat');
// const token			= require('node-uuid').v1();
// const ld			= require('lodash');

const self = module.exports = {
	create : function (model,data) {
		return new Promise((resolve,reject) => {
			model.create(data,(err,newobject) => {
				if(err) reject(err);
				resolve(newobject);
			});
		});
    }
}