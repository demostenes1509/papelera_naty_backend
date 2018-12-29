const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const modelsutil = require("@modelsutil");
const { notEmptyValidation, ValidationError } = require("@validationutil");

const getSideBarInfo = (req) => {
	const filter = {
		include: [{ model: req.db.models.products, required: true }]
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

	const filter = {
		where: { is_offer: true, is_visible: true},
		include: [{model:req.db.models.packaging, as:'packaging', required:true}]
		// include: [{ 
		// 	model: req.db.models.products, 
		// 	required: true }]
	};

	const offers = await modelsutil.findAll(req,'products',filter);

	return {};
};

module.exports = {

	get_home: async (req, res, next) => {
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