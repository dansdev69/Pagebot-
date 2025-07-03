
module.exports = {
    name: 'announce',
    role: 2,
    description: 'Send an announcement to all users',
    execute(senderId, args, client) {
        if (senderId !== client.config.owner) {
            return client.sendMessage(senderId, "You are not authorized to use this command.");
        }
        const message = args.join(" ");
        const db = client.readEconomy();
        const users = Object.keys(db);
        for (const uid of users) {
            client.sendMessage(uid, `📢 Announcement: ${message}`);
        }
        client.sendMessage(senderId, `Announcement sent to ${users.length} users.`);
    }
};