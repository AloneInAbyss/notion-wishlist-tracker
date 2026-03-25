const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    // format.timestamp({
    //   format: 'YYYY-MM-DD HH:mm:ss'
    // }),
    // format.errors({ stack: true }),
    // format.splat(),
    // format.json()
    format.prettyPrint()
  ),
  defaultMeta: { service: 'notion-wishlist-tracker' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.prettyPrint(),
  }));
}

export default logger;

/* 

--- LOG LEVELS

error: 0
warn: 1
info: 2
http: 3
verbose: 4
debug: 5
silly: 6

*/
