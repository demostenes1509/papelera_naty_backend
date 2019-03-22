const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");

module.exports = {

	/* list packaging */
	list: async (req, res) => {

		logger.info('Listing packaging');
		const packaging = await modelsutil.findAll(req,'packaging',{});
		return res.status(200).send(packaging);
	}
		
}