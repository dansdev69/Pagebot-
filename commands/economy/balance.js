
module.exports = {
    name: 'balance',
    role: 1,
    description: 'Check your balance',
    execute(senderId, args, client) {
        const db = client.readEconomy();
        const balance = db[senderId]?.balance || 0;
        client.sendMessage(senderId, `Your balance is $${balance}`);
    }
};