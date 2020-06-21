const config = require ('../config.json');
const Discord = require ('discord.js')

module.exports = {
  name: 'cleanup',
  aliases: ['clean', 'purge', 'wipe'],
  description: 'Deletes up to 30 messages from Bots. Defaults to 10.',
  usage: '``?cleanup 25``',
  hidden: true,
  execute(bot, message, args) {
    if (message.channel.type !== 'text') return;
    if (message.author.id !== config.ownerID) return message.channel.send('Only Masterpon can use this command.');

    const count = args[0] || 10;

    if (!bot.numCheck(count) || count > 30) return message.channel.send('Please enter a number 30 or less.');

    message.channel.messages.fetch({ limit: 100 })
    .then(msg => {
      const botMessages = msg.filter(m => m.author.bot || m.content.startsWith(config.prfx) && m.id !== message.id && m.id !== m.channel.lastMessageID);
      if (botMessages.size < 1) return message.channel.send('No messages to delete.');

      // Reverses the map
      const botMessagesReverse = new Discord.Collection(Array.from(botMessages).reverse());

      // Reduces size to count
      for (const [key] of botMessagesReverse) {
        if (botMessagesReverse.size <= count) break;
        botMessagesReverse.delete(key);
      }

      message.channel.bulkDelete(botMessagesReverse)
        .then(m => message.channel.send(`${m.size} messages deleted.`))
        .catch(error => {
          console.log(error);
          message.channel.send('An error has occured. Please try again later or contact Masterpon.');
        });
    })
    .catch(error => {
      console.log(error);
      message.channel.send('An error has occured. Please try again later or contact Masterpon.');
    });



  }
}
