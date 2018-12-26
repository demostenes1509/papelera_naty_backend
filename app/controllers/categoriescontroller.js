const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const modelsutil = require("@modelsutil");
const { notEmptyValidation, ValidationError } = require("@validationutil");

module.exports = {

	/* create category */
	create: async (req, res, next) => {

		logger.info('Creating new category');
		notEmptyValidation(req,['name']);

		const category = await modelsutil.create(req.models.categories,req.body);
		return res.status(200).send(category);
	},
	
	/* list categories */
	list: async (req, res, next) => {

		const categories = await modelsutil.find(req.models.categories,{});
		return res.status(200).send(categories);
    }	
}