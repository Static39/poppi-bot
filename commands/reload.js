const fs = require ('fs');
const config = require('../config.json');

module.exports = {
  name: 'reload',
  aliases: ['re'],
  description: 'Bot owner only. Reloads all commands.',
  usage: '`?reload gold`',
  hidden: true,
  execute(_bot, message, args) {
  const user = message.author.id;
  if (user !== config.ownerID) return;

  const commandName = args[0];
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
 },
};
