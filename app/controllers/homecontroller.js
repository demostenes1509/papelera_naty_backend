const logger = require("configs/loggerconfig")(module);
const modelsqueries = require("app/models/modelsqueries");
const modelsutil = require("utils/modelsutil");
const Sequelize = require("sequelize");

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const products = await modelsqueries.get_products(req,{where: { is_offer: true, is_visible: true}});
		return res.status(200).send({
			products,
			title: 'Ofertas de la semana'
		});
	},

	get_category: async (req, res) => {
		logger.info('Getting Category:'+req.params.category);

		const prodparams = {
			where: { is_visible: true,
				[Sequelize.Op.and]: [
					Sequelize.where(Sequelize.col('category.url'), { [Sequelize.Op.iLike]: req.params.category})
				]				
			}
		};

		const [ category, products ] = await Promise.all([
			modelsutil.findOne(req,'categories',{where: {url: req.params.category }}),
			modelsqueries.get_products(req,prodparams)
		]);

		return res.status(200).send({
			products,
			title: category.name
		});
	},

	get_search: async (req, res) => {
		logger.info('Getting Search info:'+req.params.search);

		const search=`%${req.params.search}%`;
		const params = {
			where: { is_visible:true,
				[Sequelize.Op.or]: [
					Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('products.name')), { [Sequelize.Op.iLike]: Sequelize.fn('unaccent',search)}),
					Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('category.name')), { [Sequelize.Op.iLike]: Sequelize.fn('unaccent',search)})
				]				
			}
		};

		const products = await modelsqueries.get_products(req,params);

		return res.status(200).send({
			products,
			title: 'Resultados de '+req.params.search
		});
	}	

}