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

const getFooterCategories = (req) => {
	return modelsutil.findAll(req,'categories',{});
};

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const params = {
			filters: { is_offer: true, is_visible: true}
		};

		const [offers, sidebarCategories, sidebarOffers, footerCategories] = await Promise.all([
			modelsqueries.get_products(req,params),
			getSideBarCategories(req),
			getSideBarOffers(req),
			getFooterCategories(req)
		]);

		return res.status(200).send({
			container: offers,
			sidebar: {
				sidebarCategories,
				sidebarOffers
			},
			footer: {
				footerCategories
			}
		});
	}

}