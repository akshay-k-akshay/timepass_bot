const convict = require("convict");
const { url } = require("convict-format-with-validator");

const schema = {
    app: {
        port: {
            doc: "The port to bind",
            format: "port",
            default: 4000,
            env: "PORT",
        },
        url: {
            doc: "The url to bind",
            format: "url",
            default: "http://localhost:4000",
            env: "APP_URL",
        },
    },
    bot: {
        token: {
            doc: "The bot token",
            format: String,
            default: "token is not provided",
            env: "BOT_TOKEN",
        },
    },
    node_env: {
        doc: "The application environment",
        format: ["dev", "prod"],
        default: "dev",
        env: "NODE_ENV",
    },
};

convict.addFormat(url);

const config = convict(schema).validate({ allowed: "strict" });

module.exports = { config };
