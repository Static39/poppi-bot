const { prfx } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of Poppi\'s commands or info about a specific command.',
	aliases: ['h', 'commands'],
	usage: '[command name]',
	hidden: false,
	execute(bot, message, args) {
		const commands = bot.commands;
		const data = [];
		const avy = bot.user.displayAvatarURL();
		//Lists all command if no argument is given
		if (!args.length) {
			//Filters out commands with hidden set to true
			let cmdArray = commands.filter(element => {
				return !element.hidden;
			}).map(command => {
					return command.name;
			});

			data.push(cmdArray.join('\n'));
			const embed = {
				"title": "Poppi",
				"description": "Poppi is a bot still in the beta stage with new features planned regularly.\n Use ``?help command`` for more information on a specific command.",
				"color": 10299826,
				"timestamp": "2018-02-14T23:02:05.978Z",
				"footer": {
					"text": "PoppiBot"
				},
				"thumbnail": {
					"url": `${avy}`
				},
				"fields": [
					{
						"name": "Commands:",
						"value": `${data}`
					}
				]
			};

			message.author.send({ embed })
				.then(() => {
					if (message.channel.type !== 'dm') {
						message.channel.send('Poppi has sent you a DM with a list of commands.');
					}
				})
				.catch((error) => {
					console.log(error);
					message.reply('It seems Poppi can not DM you.');
				});
		}
		else {
			//Checks if the specified command exists
			if (!commands.has(args[0])) {
				return message.reply('That is not a valid command.');
			}

			const command = commands.get(args[0]);

			data.push(`**Name:** ${command.name}`);
			//Only writes to the text fields if the data exists
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}\n`);
			if (command.usage) data.push(`**Usage:** ${command.usage}`);

			message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type !== 'dm') {
						message.channel.send('Poppi has sent you a DM with the command info.');
					}
				})
				.catch(() => message.reply('It seems Poppi can not DM you.'));
		}


	},
};
