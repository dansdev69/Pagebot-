
module.exports = {
    name: 'give',
    role: 2,
    description: 'Give money to a user (owner only)',
    execute(senderId, args, client) {
        const [targetUid, amount] = args;
        if (!targetUid || !amount || isNaN(amount)) {
            return client.sendMessage(senderId, 'Usage: /give target_uid amount');
        }
        const db = client.readEconomy();
        db[targetUid] = (db[targetUid] || 0) + parseInt(amount);
        client.writeEconomy(db);
        client.sendMessage(senderId, `Gave $${amount} to user ${targetUid}`);
    }
};
