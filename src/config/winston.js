const { createLogger, format, transports } = require("winston");

const { config } = require("./app-config");

const options = {
    handleExceptions: true,
    json: true,
    colorize: true,
};

const logFormat =
    config.get("node_env") == "prod"
        ? format.combine(format.errors({ stack: true }), format.json())
        : format.combine(
              format.errors({ stack: true }),
              format.colorize(),
              format.simple()
          );

const logger = createLogger({
    transports: [new transports.Console(options)],
    format: logFormat,
    exitOnError: false,
    silent: config.get("node_env") == "test",
});

const morganOption = {
    stream: {
        write: function (message) {
            logger.info(message);
        },
    },
};

module.exports = { logger, morganOption };
