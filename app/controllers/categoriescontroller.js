const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const modelsutil = require("@modelsutil");
const { notEmptyValidation, ValidationError } = require("@validationutil");

module.exports = {

	/* create category */
	create: async (req, res, next) => {
		logger.info('Creating new category');
		notEmptyValidation(req,['name']);

		const category = await req.models.category.create({name: req.body.name});
		return res.status(200).send(category);
	},
	
	/* list categories */
	list: async (req, res, next) => {
		logger.info('Listing categories');
		const categories = await req.models.category.findAll();
		logger.info('PEPE');
		return res.status(200).send(categories);
    }	
}