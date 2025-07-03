
module.exports = {
    name: 'gamble',
    role: 1,
    description: 'Gamble money for a chance to win double',
    execute(senderId, args, client) {
        const amount = parseInt(args[0]);
        const db = client.readEconomy();
        const user = db[senderId] || { balance: 0 };
        if (isNaN(amount) || amount <= 0 || user.balance < amount) {
            return client.sendMessage(senderId, "Invalid gamble amount.");
        }
        const win = Math.random() < 0.5;
        user.balance += win ? amount : -amount;
        db[senderId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, win ? `You won $${amount}!` : `You lost $${amount}.`);
    }
};