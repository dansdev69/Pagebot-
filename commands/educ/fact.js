
module.exports = {
    name: 'fact',
    role: 1,
    description: 'Get a random educational fact',
    execute(senderId, args, client) {
        const facts = [
            "The Earth revolves around the Sun.",
            "Water boils at 100°C at sea level.",
            "The human brain has about 86 billion neurons.",
            "Light travels at 299,792,458 meters per second.",
            "The mitochondrion is the powerhouse of the cell."
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        client.sendMessage(senderId, `📚 Fact: ${fact}`);
    }
};