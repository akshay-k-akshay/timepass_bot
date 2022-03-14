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
    aws: {
        accessKeyId: {
            doc: "The aws access key id",
            format: String,
            default: "accessKeyId is not provided",
            env: "AWS_ACCESS_KEY_ID",
        },
        secretAccessKey: {
            doc: "The aws secret access key",
            format: String,
            default: "secretAccessKey is not provided",
            env: "AWS_SECRET_ACCESS_KEY",
        },
        bucket: {
            doc: "The aws bucket",
            format: String,
            default: "bot--storage",
            env: "AWS_BUCKET",
        },
    },
};

convict.addFormat(url);

const config = convict(schema).validate({ allowed: "strict" });

module.exports = { config };
