
module.exports = {
    name: 'setbal',
    role: 2,
    description: 'Set the balance of a user manually',
    execute(senderId, args, client) {
        if (senderId !== client.config.owner) {
            return client.sendMessage(senderId, "You are not authorized to use this command.");
        }
        const [targetId, amountStr] = args;
        const amount = parseInt(amountStr);
        if (!targetId || isNaN(amount)) {
            return client.sendMessage(senderId, "Usage: /setbal <uid> <amount>");
        }
        const db = client.readEconomy();
        const user = db[targetId] || { balance: 0 };
        user.balance = amount;
        db[targetId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, `✅ Set balance of user ${targetId} to $${amount}`);
    }
};