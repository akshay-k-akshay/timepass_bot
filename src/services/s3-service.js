const AWS = require("aws-sdk");
const { v4 } = require("uuid");

const { config } = require("../config");

const s3 = new AWS.S3({
    accessKeyId: config.get("aws.accessKeyId"),
    secretAccessKey: config.get("aws.secretAccessKey"),
});

module.exports = {
    uploadFile: async (buffer, extension) => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: config.get("aws.bucket"),
                Key: `${v4()}.${extension}`,
                ACL: "public-read",
                Body: buffer,
            };

            s3.upload(params, function (err, data) {
                if (err) reject(err);

                return resolve(data.Location);
            });
        });
    },
};
