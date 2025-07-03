
module.exports = {
    name: 'math',
    role: 1,
    description: 'Solve a basic math expression',
    execute(senderId, args, client) {
        try {
            const expression = args.join(" ");
            const result = eval(expression);
            client.sendMessage(senderId, `Result: ${result}`);
        } catch {
            client.sendMessage(senderId, 'Invalid math expression.');
        }
    }
};