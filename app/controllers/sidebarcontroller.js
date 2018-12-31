const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const modelsqueries = require("app/models/modelsqueries");

const getSideBarCategories = (req) => {
	const filter = {
		include: [{ model: req.db.models.products, required: true,attributes: ['id','name','url'] }],
	};
	return modelsutil.findAll(req,'categories',filter);
};

const getSideBarOffers = (req) => {
	const params = {
		filters: { is_offer: true, is_visible: true},
		limit: 2
	};
	return modelsqueries.get_products(req,params);
};

module.exports = {

	get: async (req, res) => {
		logger.info('Getting sidebar info');

		const [categories, offers] = await Promise.all([
			getSideBarCategories(req),
			getSideBarOffers(req)
		]);

		return res.status(200).send({
			categories,
			offers
		});
	}

}