const logger = require("configs/loggerconfig")(module);
const modelsutil = require("utils/modelsutil");
const controllersutil = require('utils/controllersutil');
const util = require('util');

module.exports = {

	get: async (req,res) => {

		logger.info('Getting product image');
		const { picture_id } = req.params;
		const productpicture = await modelsutil.findById(req,'productspictures',picture_id);
		const { images_path } = process.env;

		const picturename		= productpicture?`${images_path}/${productpicture.id}.jpg`:`images/default/default.jpg`;
		const contenttype		= productpicture?productpicture.content_type:'image/jpeg';
		const lastupdate		= productpicture?productpicture.last_update:new Date();

		const readFile = util.promisify(require("fs").readFile);

		const data = await readFile(picturename);
		controllersutil.addImageHeaders(res,contenttype,data,picture_id,lastupdate);

		return res.status(200).send(data);
	}

}