const path = require('path');
const { createLogger, format, transports } = require('winston');
const { timestamp, label, printf } = format;

module.exports = (callingModule) => {
	
	const mylabel = () => {
		const parts = callingModule.filename.split(path.sep);
		return parts[parts.length - 2] + '/' + parts.pop();
    };
    
    const myFormat = printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });

    const logger = createLogger({
        level: process.env.log_level,
        transports: [ new transports.Console({
          format: format.combine(
                    label({ label: mylabel() }),
                    timestamp(),
                    format.colorize(),
                    myFormat
                  )
        }) ]
      });

	return logger;
};


