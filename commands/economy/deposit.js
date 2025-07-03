
module.exports = {
    name: 'deposit',
    role: 1,
    description: 'Deposit money into the bank',
    execute(senderId, args, client) {
        const amount = parseInt(args[0]);
        const db = client.readEconomy();
        const user = db[senderId] || { balance: 0, bank: 0 };
        if (isNaN(amount) || amount <= 0 || user.balance < amount) {
            return client.sendMessage(senderId, "Invalid deposit amount.");
        }
        user.balance -= amount;
        user.bank = (user.bank || 0) + amount;
        db[senderId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, `Deposited $${amount} to your bank.`);
    }
};