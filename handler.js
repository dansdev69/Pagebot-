
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
    for (const folder of commandFolders) {
        const folderPath = path.join(__dirname, 'commands', folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            client.commands.set(command.name, command);
        }
    }

    const dataPath = path.join(__dirname, 'data');
    const economyPath = path.join(dataPath, 'economy.json');
    if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);
    if (!fs.existsSync(economyPath)) fs.writeFileSync(economyPath, '{}');

    client.readEconomy = () => JSON.parse(fs.readFileSync(economyPath, 'utf8'));
    client.writeEconomy = (data) => fs.writeFileSync(economyPath, JSON.stringify(data, null, 2));
};
