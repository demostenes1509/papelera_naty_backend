const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const { notEmptyValidation } = require("utils/validationutil");

module.exports = {

	/* create category */
	create: async (req, res) => {
		logger.info('Creating new category');
		notEmptyValidation(req,['name','url']);

		const category = await modelsutil.create(req,'categories',{name: req.body.name,url:req.body.url});
		return res.status(200).send(category);
	},
	
	/* list categories */
	list: async (req, res) => {

		logger.info('Listing categories');
		const categories = await modelsutil.findAll(req,'categories',{});
		return res.status(200).send(categories);
	}
		
}