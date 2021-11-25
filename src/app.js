const TeleBot = require('telebot');

const controller = require('./controllers/bot-controller');

const token = process.env.TOKEN;

const bot = new TeleBot(token);

bot.on('inlineQuery', async (msg) => {
    const answers = bot.answerList(msg.id, { cacheTime: 60 });
    const response = await controller.handleQuery(msg.query, answers);
    return bot.answerQuery(response);
});

bot.on(['*', '/*'], async (msg, self) => {
    if (self.type == 'text') {
        return await controller.handleText(msg);
    } else if (self.type == 'command') {
        return await controller.handleCommand(msg);
    }
});

bot.on('sticker', (msg) => {
    return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png', {
        asReply: true,
    });
});

bot.on('edit', (msg) => {
    return msg.reply.text(`Entha monuse edit cheyithathu`);
});

bot.on('newChatMembers', (msg) => {
    return msg.reply.text(
        `Hii <b>${msg.new_chat_member.first_name}</b> Welcome! to <b>${msg.chat.title}</b> `,
        { parseMode: 'html' }
    );
});

bot.start();
