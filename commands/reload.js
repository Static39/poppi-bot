const fs = require ('fs');
const config = require('../config.json');

module.exports = {
  name: 'reload',
  aliases: ['re'],
  description: 'Bot owner only. Reloads all commands',
  usage: '``?reload``',
  hidden: true,
  execute(bot, message, args) {
  const user = message.author.id;
  if (user !== config.ownerID) return;

  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];

  const commandFiles = fs.readdirSync('C:/PoppiBot/commands');
  for (const file of commandFiles) {
    const command = require(`C:/PoppiBot/commands/${file}`);
    bot.commands.set(command.name, command);

  }

  message.reply(`The command ${args[0]} has been reloaded`);
 },
};
