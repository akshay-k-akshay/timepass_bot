const ytdl = require("ytdl-core");
const fs = require("fs");
const { v4 } = require("uuid");
const path = require("path");

const { config } = require("../config");

const appUrl = config.get("app.url");

module.exports = {
    download: async (url) => {
        const id = v4();
        ytdl(url, { format: "mp4" }).pipe(
            fs.createWriteStream(path.join(__dirname, `../../files/${id}.mp4`))
        );
        return `${appUrl}/files/${id}.mp4`;
    },
};
