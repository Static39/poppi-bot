//Code by: Static15 4/27/2018 7:16PM

//Variable declaration
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
//bot.jobs = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands');
const config = require('./config.json');


//Adds the commands to a collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}
//Bot login
bot.login(config.token);

//Eval stuff
const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });
});

//Starts the message listening event
bot.on('message', async message => {

  //Hidden -
  //Approaching me?
  if (message.content.toLowerCase() === 'oh? you\'re approaching me?') {
    message.channel.send('I can\'t beat the \\*\\*\\*\\* out of you without getting closer');
  }
  if (message.content.toLowerCase().includes('delicious pancake')) {
    message.channel.send({
      files: ['./assets/pancakes.png']
    });
  }

  //Checks for bot users and non-command messages and exits if true
  if (message.author.bot || message.content.indexOf(config.prfx) !== 0) return;

  //Variables
  const args = message.content.slice(config.prfx.length).split(/ +/g);
  const cmdName = args.shift().toLowerCase();

  //Eval
  if (message.content.startsWith(config.prfx + "eval")) {
    if (message.author.id !== config.ownerID) return;
    try {
      const code = args.join(' ');
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

  //Commands:
  const command = bot.commands.get(cmdName)
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  if (!command) return;

  try {
    command.execute(bot, message, args);
  } catch (err) {
    console.error(err);
  }

});

/*-- Function assignment --*/

// Username check
bot.targetFind = function target(msg, a) {
  if (!a) return msg.author;

  if (msg.mentions.users.first()) return msg.mentions.users.first();

  const users = msg.channel.members;

  const target = users.find(member => {
    return member.user.username.toLowerCase() === a.toLowerCase()
  });

  if (!target) {
    return null;
  } else {
    return target.user;
  };
};

bot.numCheck = function check(n) {
  // Checks for argument
  if (!n) return;

  // Checks for valid number
  if (Number.isNaN(n)) return false;

  // Checks if the bet is a negative
  if (n < 0) return false;

  // Checks if the bet is a whole number
  if (n % 1 !== 0) return false;

  return true;
}
