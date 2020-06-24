const fs = require('fs');

module.exports = {
  name: 'moe',
  aliases: [],
  description: 'Displays a moe picture.',
  usage: '``?moe``',
  hidden: false,
  execute(bot, message, args) {
    if (message.channel.type !== 'text') return;

    //Adds the pictures from the directory into an array
    const pics = fs.readdirSync('./assets/Moe');
    //Chooses a random number based on picture count
    const randm = Math.floor(Math.random() * (pics.length + 1));

    message.channel.send({
      files: [`./assets/Moe/${pics[randm]}`]
    });
  },
}
