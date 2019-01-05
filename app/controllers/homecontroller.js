const logger = require("configs/loggerconfig")(module);
const modelsqueries = require("app/models/modelsqueries");

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const params = {
			where: { is_offer: true, is_visible: true}
		};

		const products = await modelsqueries.get_products(req,params);

		return res.status(200).send({
			products
		});
	},

	get_category: async (req, res) => {
		logger.info('Getting Category info:'+req.params.category);

		const params = {
			where: { is_visible: true},
			category: req.params.category
		};

		const products = await modelsqueries.get_products(req,params);

		return res.status(200).send({
			products
		});
	}	

}