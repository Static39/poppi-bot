module.exports = {
  name: 'avatar',
  aliases: ['avy', 'pfp'],
  description: 'Displays a user\'s avatar. If no user is specified displays yours.',
  usage: '`?avatar @MyWaifu`',
  hidden: false,
  execute(bot, message, args) {
    if (message.channel.type !=='text') return;

    const avatar = bot.targetFind(message, args[0]);
    
    if (!avatar) {
      message.channel.send(message.author.displayAvatarURL());
    } else {
      message.channel.send(avatar.displayAvatarURL());
    };
  },
};
