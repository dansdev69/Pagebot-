
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const handler = require('./handler');
const config = require('./config.json');

const app = express();
app.use(bodyParser.json());

const client = {
    commands: new Map(),
    sendMessage: async (recipientId, message) => {
        try {
            await axios.post(
                `https://graph.facebook.com/v18.0/me/messages?access_token=${config.pageAccessToken}`,
                {
                    recipient: { id: recipientId },
                    message: { text: message }
                }
            );
        } catch (error) {
            console.error("Failed to send message:", error.response?.data || error.message);
        }
    }
};

handler(client);

// Facebook Webhook verification
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = config.verifyToken;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Handle messages
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            const senderId = webhookEvent.sender.id;
            const messageText = webhookEvent.message?.text;

            if (messageText && messageText.startsWith('/')) {
                const [commandName, ...args] = messageText.slice(1).split(' ');
                const command = client.commands.get(commandName.toLowerCase());

                if (command) {
                    const userRole = (senderId === config.owner) ? 2 : 1;
                    if (command.role <= userRole) {
                        command.execute(senderId, args, client);
                    } else {
                        client.sendMessage(senderId, "You don't have permission to use this command.");
                    }
                } else {
                    client.sendMessage(senderId, "Command not found.");
                }
            }
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Monobot is listening on port ${PORT}`));
