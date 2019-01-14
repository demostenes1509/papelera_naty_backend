module.exports = {
	create : (req,model,data) => {
		return req.db.models[model].create(data,{transaction: req.trx});
	},
	
	findAll : (req,model,filter) => {
		return req.db.models[model].findAll(filter,{transaction: req.trx});
	},

	findOne : (req,model,filter) => {
		return req.db.models[model].findOne(filter,{transaction: req.trx});
	},

	save : (req,obj) => {
		return obj.save({transaction: req.trx});
	}
}