const config = require('../config.json');

module.exports = {
  name: 'kill',
  aliases: [],
  description: 'Attempts to kill a user with a specified weapon.',
  usage: '``?kill @yaoiOnIce Icicle``',
  hidden: false,
  execute(bot, message, args) {

  if (message.channel.type !== 'text') return;


  const target = bot.targetFind(message, args[0]);
  const weapon = args.slice(1).join(' ');
  const picture = Math.floor(Math.random() * 3);

  // Checks if it's Masterpon
  const name = bot.masterponCheck(message.author);

  if (target === message.author || !target) {
    message.channel.send(`${name} is missing a target.\nTo attempt a kill use: \`\`?kill @target weapon\`\``);
    return;
  }
  if (weapon === '') {
    message.channel.send(`${name} is missing a weapon.\nTo attempt a kill use: \`\`?kill @target weapon\`\``);
    return;
  }

  // Checks if target is Masterpon
  const name2 = bot.masterponCheck(target);

  message.channel.send(`Poppi will attempt to kill ${name2} with: \`\`${weapon}\`\``);

  setTimeout(() => {
    if (Math.random() < 0.4) {
      message.channel.send(`${name2} got away...`);
    }
    else {
      message.channel.send(`${name2} has been killed with: \`\`${weapon}\`\`!`);
    }
  }, 30000);
 },
};
