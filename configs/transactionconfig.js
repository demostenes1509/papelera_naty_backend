module.exports = (app) => {
	app.use(async (req,res,next) => {
			req.trx = app.trx;
			next();
	});
};