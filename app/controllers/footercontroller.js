const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");

const getFooterCategories = (req) => {
	return modelsutil.findAll(req,'categories',{});
};

module.exports = {

	get: async (req, res) => {
		logger.info('Getting footer');

		const categories = await getFooterCategories(req);

		return res.status(200).send({
			categories
		});
	}

}