const modelsutil = require("utils/modelsutil");
// const Sequelize = require("sequelize");

module.exports = {

	get_products: (req, params) => {

		const filter = {
			where: params.where,
			include: []
		};

		// let catwhere={};
		// if(params.category) catwhere = { url: params.category };
		// if(params.search) catwhere = { name: { [Sequelize.Op.iLike]: params.search } };

		// console.log(catwhere);

		filter.include.push({ model: req.db.models.categories, as: 'category', required: true });
		filter.include.push({ model: req.db.models.packaging, as: 'packaging', required: true });
		filter.include.push({ model: req.db.models.productsformats, as: 'productsformats' });
		filter.include.push({ model: req.db.models.productspictures, as: 'productspictures' });

		if (params.limit) filter.limit = params.limit;

		return modelsutil.findAll(req, 'products', filter);
	}

}