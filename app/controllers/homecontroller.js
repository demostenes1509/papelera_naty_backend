const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const modelsqueries = require("app/models/modelsqueries");

const getSideBarInfo = (req) => {
	const filter = {
		include: [{ model: req.db.models.products, required: true,attributes: ['id','name','url'] }],
	};
	return modelsutil.findAll(req,'categories',filter);
};

const getProductHome = async (req) => {
	return {};
};

const getCategoryHome = async (req) => {
	return {};
};

const getSearchHome = async (req) => {
	return {};
};

const getOffersHome = async (req) => {

	const params = {
		filters: { is_offer: true, is_visible: true}
	};

	return await modelsqueries.get_products(req,params);
};

module.exports = {

	get_home: async (req, res) => {
		let container;
		if(req.params.product) {
			logger.info('Getting products info');
			container=await getProductHome(req);
		}
		else if(req.params.category) {
			logger.info('Getting categories info');
			container=await getCategoryHome(req);
		} 
		else  if(req.params.search) {
			logger.info('Getting search info');
			container=await getSearchHome(req);
		}
		else {
			logger.info('Getting offers info');
			container=await getOffersHome(req);
		}

		const sidebar = await getSideBarInfo(req);

		return res.status(200).send({
			container,
			sidebar
		});
    }	
}