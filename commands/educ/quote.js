
module.exports = {
    name: 'quote',
    role: 1,
    description: 'Send a motivational quote',
    execute(senderId, args, client) {
        const quotes = [
            "Believe you can and you're halfway there.",
            "Education is the most powerful weapon you can use to change the world.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "The only limit to our realization of tomorrow is our doubts of today."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        client.sendMessage(senderId, `💡 Quote: ${quote}`);
    }
};