const config = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'decode',
    aliases: [],
    description: 'Decodes zero-width hidden messages.',
    usage: '`?decode Secret Message`',
    hidden: true,
    async execute(_bot, message, args) {
        if (message.author.id !== config.ownerID) return;

        const decodeMsg = encodeURIComponent(args.join('+'));
        let secretMsg = 'null';

        try {
            const response = await fetch(`https://neatnik.net/steganographr/api?decode=${decodeMsg.trim()}`);
            secretMsg = await response.text();
        }
        catch (error) {
            message.channel.send('An error has occurred');
            console.log(error);
        }

        message.channel.send(`${secretMsg}`);
    }
}