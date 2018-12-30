const Sequelize = require('sequelize');

const fillProductFormat = (product,productformat,filters) => {
    let retaildescription		= '';
    let wholesaledescription	= '';
    const begin					= '<span class="price-con">$';
	const end					= '</span>';

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
    
    productformat.dataValues.retaildescription		= retaildescription;
    productformat.dataValues.wholesaledescription	= wholesaledescription;
    productformat.dataValues.quantity				= productformat.quantity.toFixed(2);
    productformat.dataValues.units					= productformat.units.toFixed(2);
    productformat.dataValues.retail				= productformat.retail.toFixed(2);
    productformat.dataValues.wholesale				= productformat.wholesale.toFixed(2);
}

module.exports = function (db) {

	const products = db.define('products', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		url: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		is_visible: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		},
		is_offer: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	}, { 
		timestamps: false, 
		underscored: true 
	});

	products.afterFind('someCustomName222', (result, options) => {
		for(const product of result) {
			for(const productformat of product.productsformats) {
				fillProductFormat(product,productformat,{includeunique:true});
			}
		}
	});

	return products;
};