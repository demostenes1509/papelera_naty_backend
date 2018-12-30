const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const modelsqueries = require("app/models/modelsqueries");

const getSideBarInfo = (req) => {
	const filter = {
		include: [{ model: req.db.models.products, required: true,attributes: ['id','name','url'] }],
	};
	return modelsutil.findAll(req,'categories',filter);
};

const fillProductFormat = (product,productformat,filters) => {
    var retaildescription		= '';
    var wholesaledescription	= '';
    var begin					= '<span class="price-con">$';
    var end						= '</span>';

    if( productformat.units%1 !==0) {
        // Ejemplo de esta condicion: Bobinas de papel diario
        retaildescription += productformat.units.toFixed(2)+' '+product.packaging.name + 's ' + productformat.format;
    }
    else if ( productformat.units === 1 ) {
        // Ejemplo de esta condicion: Bandas elasticas
        retaildescription += productformat.units +' '+product.packaging.name + ' ' + productformat.format;
    }
    else {
        // Ejemplo de esta condicion: Blondas de papel caladas
        retaildescription += product.packaging.name +' '+ productformat.units + ' unid. ' + productformat.format;
    }
    if(productformat.retail !==0 && filters.includeunique) {
        retaildescription += ' a '+begin+productformat.retail.toFixed(2)+end;
        if ( productformat.units !== 1 ) {
            retaildescription += ' c/u';
        }
    }
    
    if(productformat.retail !==0 && productformat.wholesale !== 0) {
        wholesaledescription	+= productformat.quantity+' '+product.packaging.name+'s '+begin+productformat.wholesale.toFixed(2)+end+' c/u a '+begin+(productformat.wholesale*productformat.quantity).toFixed(2)+end;
    }
    
    productformat.retaildescription		= retaildescription;
    productformat.wholesaledescription	= wholesaledescription;
    productformat.quantity				= productformat.quantity.toFixed(2);
    productformat.units					= productformat.units.toFixed(2);
    productformat.retail				= productformat.retail.toFixed(2);
    productformat.wholesale				= productformat.wholesale.toFixed(2);
}

module.exports = {

	get_offers: async (req, res) => {
		logger.info('Getting Offers info');

		const params = {
			filters: { is_offer: true, is_visible: true}
		};

		const products=await modelsqueries.get_products(req,params);
		const sidebarcategories = await getSideBarInfo(req);

		/*
		for(const product of products) {
			for(const productformat of product.productsformats) {
				fillProductFormat(product,{includeunique:true}
			}
		}
		*/

		return res.status(200).send({
			container: products,
			sidebar: {
				categories: sidebarcategories
			}
		});
	},
	
	get_search: async (req, res) => {
		return res.status(200).send('OK');
	},
	
	get_category: async (req, res) => {
		return res.status(200).send('OK');
	},
	
	get_product: async (req, res) => {
		return res.status(200).send('OK');
	},
	

}