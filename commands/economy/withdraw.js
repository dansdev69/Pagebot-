
module.exports = {
    name: 'withdraw',
    role: 1,
    description: 'Withdraw money from the bank',
    execute(senderId, args, client) {
        const amount = parseInt(args[0]);
        const db = client.readEconomy();
        const user = db[senderId] || { balance: 0, bank: 0 };
        if (isNaN(amount) || amount <= 0 || (user.bank || 0) < amount) {
            return client.sendMessage(senderId, "Invalid withdrawal amount.");
        }
        user.bank -= amount;
        user.balance += amount;
        db[senderId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, `Withdrew $${amount} from your bank.`);
    }
};