const modelsutil = require("utils/modelsutil");

module.exports = {

    get_products : (req,params) => {

        const filter = {
            where: params.filters,
            include: [
                {model:req.db.models.packaging, as:'packaging', required:true},
                {model:req.db.models.categories, as:'category', required:true},
                {model:req.db.models.productsformats, as:'productsformats'},
                {model:req.db.models.productspictures, as: 'productspictures'}
            ]
        };

        if(params.limit) filter.limit = params.limit;

        return modelsutil.findAll(req,'products',filter);        
    }

}