
module.exports = {
    name: 'daily',
    role: 1,
    description: 'Claim your daily $100',
    execute(senderId, args, client) {
        const db = client.readEconomy();
        const now = Date.now();
        const user = db[senderId] || { balance: 0, lastDaily: 0 };
        if (now - (user.lastDaily || 0) < 86400000) {
            return client.sendMessage(senderId, "You've already claimed your daily reward.");
        }
        user.balance += 100;
        user.lastDaily = now;
        db[senderId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, "You received $100 daily reward!");
    }
};