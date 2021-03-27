const fetch = require('node-fetch');

module.exports = {
    name: 'sauce',
    aliases: ['source'],
    description: "Tries to find the source of an anime screenshot. Command accepts upload or image URL.",
    usage: ['``?sauce https://imageurl.net/myimage.png``'],
    hidden: false,
    execute(_bot, message, args) {

        let img;

        // Checks for a valid image before proceeding
        if (args[0]) {
            img = args[0].replace(/\n/gm, '').replace(/\?.*/gm, '').trim();
        }
        else if (message.attachments.first()) {
            img = message.attachments.first().url;
        }
        else {
            return message.channel.send('Please attach an image or provide image URL.');
        }

        // Sends the request to trace.moe
        fetch(`https://trace.moe/api/search?url=${img}`)
            .then((res) => res.json())
            .then((result) => {
                if (!result.docs) {
                    return message.channel.send('Please send a valid image.');
                }

                // Filters out results with less than a 87% similarity
                const anime = result.docs.filter(image => Math.round(image.similarity * 100) >= 87);

                if (anime < 1) {
                    return message.channel.send('No results found.');
                }
                message.channel.send(`https://myanimelist.net/anime/${anime[0].mal_id}/`);
            })
            .catch((err) => {
                message.channel.send('An error occurred. Please try again later or contact Masterpon.');
                console.log(err)
            });

    }
}