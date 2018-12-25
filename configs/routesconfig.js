const modulealias = require('module-alias/register');
const logger = require("@logger")(module);
const controllers = require('../app/controllers/controller');

module.exports = (app) => {

    app.post 	( '/categories',                   controllers.categories.create);

};