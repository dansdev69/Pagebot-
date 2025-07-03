
module.exports = {
    name: 'help',
    role: 1,
    description: 'Show all commands',
    execute(senderId, args, client) {
        let helpText = `-----------------------------\n🌀Commands🌀\n-----------------------------\n`;
        for (const [name, command] of client.commands) {
            helpText += `/${name}\nRole: ${command.role}\n${command.description}\n——————————\n`;
        }
        helpText += `|• thank you for using monobot.\n👑 Owner: Daniel Mojar.\n|• this bot is for free.`;
        client.sendMessage(senderId, helpText);
    }
};
