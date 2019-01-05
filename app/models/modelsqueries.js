const modelsutil = require("utils/modelsutil");

module.exports = {

	get_products: (req, params) => {

		const filter = {
			where: params.where,
			include: []
		};

		const catwhere = params.category ? { url: params.category } : {};
		filter.include.push({ model: req.db.models.categories, where: catwhere, as: 'category', required: true });
		filter.include.push({ model: req.db.models.packaging, as: 'packaging', required: true });
		filter.include.push({ model: req.db.models.productsformats, as: 'productsformats' });
		filter.include.push({ model: req.db.models.productspictures, as: 'productspictures' });

		if (params.limit) filter.limit = params.limit;

		return modelsutil.findAll(req, 'products', filter);
	}

}