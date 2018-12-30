const modulealias = require('module-alias/register');
const logger = require("configs/loggerconfig")(module);
const modelsutil = require("@modelsutil");

module.exports = {

    get_products : (req,params) => {

        const filter = {
            where: params.filters,
            include: [
                {model:req.db.models.packaging, as:'packaging', required:true},
                {model:req.db.models.categories, as:'category', required:true},
                {model:req.db.models.productsformats},
                {model:req.db.models.productspictures}
            ]
        };

        // if(params.limit) filter.limit = params.limit;
    
        return modelsutil.findAll(req,'products',filter);        
    }

}