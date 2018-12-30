const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const modelsqueries = require("app/models/modelsqueries");

const getSideBarInfo = (req) => {
	const filter = {
		include: [{ model: req.db.models.products, required: true,attributes: ['id','name','url'] }],
	};
	return modelsutil.findAll(req,'categories',filter);
};

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const params = {
			filters: { is_offer: true, is_visible: true}
		};

		const products=await modelsqueries.get_products(req,params);
		const sidebarcategories = await getSideBarInfo(req);

		return res.status(200).send({
			container: products,
			sidebar: {
				categories: sidebarcategories
			}
		});
	}

}