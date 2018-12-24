'use strict';

const ma = require('module-alias/register');
const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

module.exports = function(callingModule) {
	
	const mylabel = function() {
		const parts = callingModule.filename.split(path.sep);
		return parts[parts.length - 2] + '/' + parts.pop();
    };
    
    const myFormat = printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });
      
    const logger = createLogger({
        level: process.env.log_level,
        format: combine(
            label({ label: mylabel() }),
            timestamp(),
            myFormat,
            format.colorize()
          ),
        transports: [ new transports.Console() ]
      });

	return logger;
};


