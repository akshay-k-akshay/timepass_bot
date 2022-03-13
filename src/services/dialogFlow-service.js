const dialogFlow = require("@google-cloud/dialogflow");

const uuid = require("uuid");

const { project_id } = require("../../keyFile.json");

const sessionClient = new dialogFlow.SessionsClient({
    keyFilename: "keyFile.json",
});

const sessionId = uuid.v4();

const sessionPath = sessionClient.projectAgentSessionPath(
    project_id,
    sessionId
);

module.exports = {
    handleText: async (msg) => {
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: msg,
                    languageCode: "en-US",
                },
            },
        };
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        if (result.intent) {
            return result.fulfillmentText;
        } else {
            return "Something went Wrong";
        }
    },
};
