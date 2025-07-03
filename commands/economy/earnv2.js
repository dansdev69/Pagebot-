
module.exports = {
    name: 'earnv2',
    role: 1,
    description: 'Earning mini-game #9',
    execute(senderId, args, client) {
        const earned = Math.floor(Math.random() * 20000 + 25);
        const db = client.readEconomy();
        const user = db[senderId] || { balance: 0 };
        user.balance += earned;
        db[senderId] = user;
        client.writeEconomy(db);
        client.sendMessage(senderId, `You earned $${earned} from mini-game!`);
    }
};
