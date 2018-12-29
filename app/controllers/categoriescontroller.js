const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const modelsutil = require("@modelsutil");
const { notEmptyValidation, ValidationError } = require("@validationutil");

module.exports = {

	/* create category */
	create: async (req, res, next) => {
		logger.info('Creating new category');
		notEmptyValidation(req,['name','url']);

		const category = await modelsutil.create(req,'categories',{name: req.body.name,url:req.body.url});
		return res.status(200).send(category);
	},
	
	/* list categories */
	list: async (req, res, next) => {

		logger.info('Listing categories');
		const categories = await modelsutil.findAll(req,'categories',{});
		return res.status(200).send(categories);
	}
		
}