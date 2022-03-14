const ytdl = require("ytdl-core");

const s3Service = require("./s3-service");
const utilService = require("./util.service");

module.exports = {
    getVideo: async (url) => {
        const buffer = await utilService.stream2buffer(
            ytdl(url, { format: "mp4" })
        );
        return await s3Service.uploadFile(buffer, "mp4");
    },
};
