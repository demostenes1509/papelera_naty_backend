const logger = require("configs/loggerconfig")(module);
const pf = require('promise.prototype.finally');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { TOKEN_NAME, AUTHORIZATION } = require('configs/constantsconfig');

module.exports = (app) => {

    const opts = {
        exposedHeaders: [ TOKEN_NAME, AUTHORIZATION ],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Set-Cookie', TOKEN_NAME,AUTHORIZATION ]
    };

    logger.debug("Adding cors");
    app.use(cors(opts));
    
    logger.debug("Adding Bearer");
    app.use(bearerToken());
    
    logger.debug("Add finally() implementation to promises");
    pf.shim();
    
    logger.debug("Enabling GZip compression.");
    app.use(compression({
        threshold: 512
    })); 

    const bodyMaxSize = 1024 * 1024 * 8 * 100;
    logger.debug("Setting parse urlencoded request bodies into req.body.");
    app.use(bodyParser.urlencoded({ extended: true, limit: bodyMaxSize }));
    app.use(bodyParser.json({limit: bodyMaxSize}));

    logger.debug("Setting express validator");
    app.use(expressValidator());

};
