module.exports = {
	create : (req,model,data) => {
		return req.db.models[model].create(data,{transaction: req.trx});
	},
	
	findAll : (req,model,filter) => {
		filter.transaction = req.trx;
		return req.db.models[model].findAll(filter);
	},

	findOne : (req,model,filter) => {
		filter.transaction = req.trx;
		return req.db.models[model].findOne(filter);
	},

	save : (req,obj,data) => {
		return obj.update(data,{transaction: req.trx});
	}
}