const addImageHeaders = (res,content_type,data,id,last_update) => {
	res.setHeader('Content-Type', content_type);
	res.setHeader('Content-Length', data.length);
	res.setHeader('Type', 'image');
	res.setHeader('Content-Disposition', 'inline; filename='+id);
	res.setHeader('Cache-Control', 'must-revalidate,private');
	res.setHeader('Expires', '-1');
	res.setHeader('Last-Modified', last_update.toUTCString());	
}

module.exports = {
	addImageHeaders
}