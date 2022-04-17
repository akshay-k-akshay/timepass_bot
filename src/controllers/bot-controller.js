const dialogFlowService = require("../services/dialogFlow-service");
const youtubeService = require("../services/youtube");
const torrentService = require("../services/torrent.js");

module.exports = {
    handleText: async (msg) => {
        const response = await dialogFlowService.handleText(msg.text);
        return msg.reply.text(response);
    },

    handleCommand: async (msg, handleReply) => {
        if (msg.text == "/start" || msg.text == "/hello") {
            const text = `Hii <b>${msg.from.first_name} ${
                msg.from.last_name ?? ""
            }</b>. Welcome! to <b>Timepass bot</b>`;
            return handleReply("text", msg.chat, { text });
        }
        if (msg.text.includes("/youtube")) {
            const url = msg.text.split(" ")[1];
            if (!url) {
                return handleReply("text", msg.chat, {
                    text: "Please provide a youtube url",
                });
            }
            return handleReply("document", msg.chat, {
                url: await youtubeService.getVideo(url),
            });
        }

        if (msg.text.includes("/torrent")) {
            const magnetURI = msg.text.split(" ")[1];
            if (!magnetURI) {
                return handleReply("text", msg.chat, {
                    text: "Please provide a torrent url",
                });
            }
            handleReply("text", msg.chat, {
                text: "Downloading torrent file...",
            });
            return handleReply("text", msg.chat, {
                text: await torrentService.getFile(magnetURI),
            });
        }

        return handleReply("text", msg.chat, {
            text: "This command is not supported",
        });
    },

    handleQuery: async (query, answers) => {
        answers.addArticle({
            id: "query",
            title: "Inline Title",
            description: `Your query: ${query}`,
            message_text: "Click!",
        });

        // Photo
        answers.addPhoto({
            id: "photo",
            caption: "Telegram logo.",
            photo_url: "https://telegram.org/img/t_logo.png",
            thumb_url: "https://telegram.org/img/t_logo.png",
        });

        // Gif
        answers.addGif({
            id: "gif",
            gif_url: "https://telegram.org/img/tl_card_wecandoit.gif",
            thumb_url: "https://telegram.org/img/tl_card_wecandoit.gif",
        });
        if (answers.length === 0) {
            return "No answer found";
        }

        return answers;
    },
};
