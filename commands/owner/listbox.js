
module.exports = {
    name: 'listbox',
    role: 2,
    description: 'Show how many users are using the bot',
    execute(senderId, args, client) {
        if (senderId !== client.config.owner) {
            return client.sendMessage(senderId, "You are not authorized to use this command.");
        }
        const db = client.readEconomy();
        const userCount = Object.keys(db).length;
        client.sendMessage(senderId, `📦 Total users using the bot: ${userCount}`);
    }
};