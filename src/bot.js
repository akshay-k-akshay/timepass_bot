const TeleBot = require("telebot");

const controller = require("./controllers/bot-controller");
const { config } = require("./config");

const token = config.get("bot.token");

const bot = new TeleBot(token);

function handleReply(type, user, data) {
    switch (type) {
        case "text":
            return bot.sendMessage(user.id, data.text, {
                parseMode: "html",
            });
        case "photo":
            return bot.sendPhoto(user.id, data.url);
        case "gif":
            return bot.sendGif(user.id, data.url);
        case "audio":
            return bot.sendAudio(user.id, data.url);
        case "video":
            return bot.sendVideo(user.id, data.url);
        case "document":
            return bot.sendDocument(user.id, data.url);
        default:
            return bot.sendMessage(user.id, "No answer found");
    }
}

bot.on("inlineQuery", async (msg) => {
    const answers = bot.answerList(msg.id, { cacheTime: 60 });
    const response = await controller.handleQuery(msg.query, answers);
    return bot.answerQuery(response);
});

bot.on(["*", "/*"], async (msg, self) => {
    if (self.type == "text") {
        return await controller.handleText(msg, handleReply);
    }
    if (self.type == "command") {
        return await controller.handleCommand(msg, handleReply);
    }
});

bot.on("sticker", (msg) => {
    return msg.reply.sticker("http://i.imgur.com/VRYdhuD.png", {
        asReply: true,
    });
});

// bot.on("edit", (msg) => {
//     return msg.reply.text(`Entha monuse edit cheyithathu`);
// });

bot.on("newChatMembers", (msg) => {
    return msg.reply.text(
        `Hii <b>${msg.new_chat_member.first_name}</b> Welcome! to <b>${msg.chat.title}</b> `,
        { parseMode: "html" }
    );
});

bot.start();
