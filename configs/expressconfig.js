const logger = require("configs/loggerconfig")(module);
const pf = require('promise.prototype.finally');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { AUTHORIZATION } = require('configs/constantsconfig');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = (app) => {

    const opts = {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Set-Cookie', AUTHORIZATION ]
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
		
		logger.debug("Setting 'Public' folder with maxAge: 1 Day.");
		const oneYear = 31557600000;
		app.use('/static',express.static('static', { maxAge: oneYear }));

		// logger.debug('Setting Session');
		// const { db_database, db_host, db_user, db_password } = process.env;
		// app.use(session({
		// 	store: new pgSession({
		// 		tableName : 'users_sessions',
		// 		conString: `postgresql://${db_user}:${db_password}@${db_host}/${db_database}`
		// 	}),
		// 	secret: 'Pilarcita1',
		// 	resave: false,
		// 	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
		// }));

		app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    }));

		logger.debug('Setting Passport');
		app.use(passport.initialize());
		// app.use(passport.session());

};
