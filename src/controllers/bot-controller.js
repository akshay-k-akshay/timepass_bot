const dialogFlowService = require('../services/dialogFlow-service');

module.exports = {
    handleText: async (msg) => {
        const response = await dialogFlowService.handleText(msg.text);
        return msg.reply.text(response);
    },

    handleCommand: async (msg) => {
        if (msg.text == '/start' || msg.text == '/hello') {
            return msg.reply.text(
                `Hii <b>${msg.chat.first_name}</b>. Welcome! to <b>Timepass bot</b>`,
                { parseMode: 'html' }
            );
        } else {
            let replyToMessage = msg.message_id;
            return msg.reply.text(`This is a <b>command</b> message.`, {
                replyToMessage,
                parseMode: 'html',
            });
            // return bot.sendMessage(
            //     msg.from.id, `This is a <b>command</b> message.`, { replyToMessage, parseMode: 'html' }
            // );
        }
    },

    handleQuery: async (query, answers) => {
        answers.addArticle({
            id: 'query',
            title: 'Inline Title',
            description: `Your query: ${query}`,
            message_text: 'Click!',
        });

        // Photo
        answers.addPhoto({
            id: 'photo',
            caption: 'Telegram logo.',
            photo_url: 'https://telegram.org/img/t_logo.png',
            thumb_url: 'https://telegram.org/img/t_logo.png',
        });

        // Gif
        answers.addGif({
            id: 'gif',
            gif_url: 'https://telegram.org/img/tl_card_wecandoit.gif',
            thumb_url: 'https://telegram.org/img/tl_card_wecandoit.gif',
        });
        if (answers.length === 0) {
            return 'No answer found';
        }

        return answers;
    },
};
