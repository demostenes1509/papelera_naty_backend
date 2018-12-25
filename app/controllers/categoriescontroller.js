const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const modelsutil = require("@modelsutil");

module.exports = {

	/* create category */
	create: async (req, res, next) => {
		const category = await modelsutil.create(req.models.cities,{name: req.body.name});
		return res.status(200).send(city);
    }
}