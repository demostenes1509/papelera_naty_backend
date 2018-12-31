const logger = require("configs/loggerconfig")(module);
const modelsqueries = require("app/models/modelsqueries");

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const params = {
			filters: { is_offer: true, is_visible: true}
		};

		const offers = await modelsqueries.get_products(req,params);

		return res.status(200).send({
			offers
		});
	}

}