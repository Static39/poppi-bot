const { Gold } = require('../dbObjects');

module.exports = {
  name: 'gold',
  aliases: ['g'],
  description: 'Shows a user\'s gold. If no user is specified shows yours.',
  usage: '`?gold @greed`',
  hidden: false,
  async execute(bot, message, args) {
  if (message.channel.type !== 'text') return;

  // Fetches user
  const user = bot.targetFind(message, args[0]);
  if (user === null) return message.channel.send('User not found.');

  // Checks if it's Masterpon
  const name = bot.masterponCheck(user);

  // Fetches user from database
  const userData = await bot.goldCheck(Gold, user.id);

  message.channel.send(`${name} has \`${userData.gold}\` gold.`);
 },
};
