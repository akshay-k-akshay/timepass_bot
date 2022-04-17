const WebTorrent = require("webtorrent");
const AdmZip = require("adm-zip");

const { stream2buffer } = require("./util.service");
const s3Service = require("./s3-service");

const client = new WebTorrent();
const zip = new AdmZip();

module.exports = {
    getFile: async (magnetURI) => {
        return new Promise((resolve, reject) => {
            client.add(magnetURI, async (torrent) => {
                if (torrent.files.length == 0) {
                    return reject("No files found");
                }
                await Promise.all(
                    torrent.files.map(async (file) => {
                        const reader = file.createReadStream();
                        const buffer = await stream2buffer(reader);
                        zip.addFile(file.name, buffer);
                    })
                );
                const buffer = zip.toBuffer();
                const url = await s3Service.uploadFile(
                    buffer,
                    "",
                    `${torrent.name}.zip`
                );
                resolve(
                    `Your file is ready: <a href="${url}">Click here</a> to download. <b>Note:</b> This link will expire in 1 hour.`
                );
            });
        });
    },
};
