module.exports = {
	create : (req,model,data) => {
		if(!req.trx) throw new Error('Transaction not active');
		return req.db.models[model].create(data,{transaction: req.trx});
	},

	findOrCreate : (req,model,data) => {
		if(!req.trx) throw new Error('Transaction not active');
		data.transaction = req.trx;
		return req.db.models[model].findOrCreate(data);
	},

	findAll : (req,model,filter) => {
		if(!req.trx) throw new Error('Transaction not active');
		filter.transaction = req.trx;
		return req.db.models[model].findAll(filter);
	},

	findOne : (req,model,filter) => {
		if(!req.trx) throw new Error('Transaction not active');
		filter.transaction = req.trx;
		return req.db.models[model].findOne(filter);
	},

	findById : (req,model,id) => {
		if(!req.trx) throw new Error('Transaction not active');
		return req.db.models[model].findByPk(id,{transaction: req.trx});
	},

	save : (req,obj,data) => {
		if(!req.trx) throw new Error('Transaction not active');
		return obj.update(data,{transaction: req.trx});
	},

	destroy : (req,model,filter) => {
		if(!req.trx) throw new Error('Transaction not active');
		filter.transaction = req.trx;
		return req.db.models[model].destroy(filter);
	}	

}