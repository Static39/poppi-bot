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

  //Checks if it's Masterpon
  let name;
  if (message.author.id === config.ownerID) {
    name = 'Masterpon';
  } else {
    name = message.author.username;
  }

  if (target === message.author || !target) {
    message.channel.send(`${name} is missing a target.\nTo attempt a kill use: \`\`?kill @target weapon\`\``);
    return;
  }
  if (weapon === '') {
    message.channel.send(`${name} is missing a weapon.\nTo attempt a kill use: \`\`?kill @target weapon\`\``);
    return;
  }

  //Checks if target is Masterpon
  let name2;
  if (target.id === config.ownerID) {
    name2 = 'Masterpon';
  } else {
    name2 = target.username;
  }

  message.channel.send(`Poppi will attempt to kill ${name2} with a \`\`${weapon}\`\``);

  setTimeout(kill => {
    if (Math.random() < 0.4) {
      message.channel.send(`${name2} got away.`, {
        files: ['./assets/escape.gif']
      });
    }
    //Chooses a picture to display
    else {
      if(picture === 0) {
        message.channel.send(`${name2} has been killed with a ` + '``' +`${weapon}` + '``.', {
          files: ['./assets/death1.gif']
        });
      }
      else if(picture === 1) {
        message.channel.send(`${name2} has been killed with a ` + '``' +`${weapon}` + '``.', {
          files: ['./assets/death2.gif']
        });
      }
      else if(picture === 2) {
        message.channel.send(`${name2} has been killed with a ` + '``' +`${weapon}` + '``.', {
          files: ['./assets/death3.gif']
        });
      }
    }
  }, 30000);
 },
};
