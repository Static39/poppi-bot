const config = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'encode',
    aliases: [],
    description: 'Encodes zero-width hidden messages',
    usage: '``?encode I\'m a normal message. <-> Hidden message``',
    hidden: true,
    async execute(_bot, message, args) {
        if (message.author.id !== config.ownerID) return;

        const msgContent = args.join('+');

        let encodeMsg = msgContent.trim().split('<->');
        let secretMsg = 'null';

        if (!encodeMsg[0] || !encodeMsg[1]) return message.channel.send('Please give valid messages to encode.');

        try {
            const response = await fetch(`https://neatnik.net/steganographr/api?public=${encodeMsg[0].trim()}&private=${encodeMsg[1].trim()}`);
            secretMsg = await response.text();
        }
        catch (error) {
            console.log(error);
            message.channel.send('An error has occurred.');
        }

        message.channel.send(`${secretMsg}`);
    }
}