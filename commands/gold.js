const config = require('../config.json');
const { Gold } = require('../dbObjects');

module.exports = {
  name: 'gold',
  aliases: ['g'],
  description: 'Shows user\'s gold. If no user is specified shows yours.',
  usage: '``?gold @greed``',
  hidden: false,
  async execute(bot, message, args) {
  if (message.channel.type !== 'text') return;

  // Fetches user
  const user = bot.targetFind(message, args[0]);
  if (user === null) return message.channel.send('User not found.');

  // Checks if it's Masterpon
  let name;
  if (user.id === config.ownerID) {
    name = 'Masterpon';
  } else {
    name = user.username;
  }

  // Fetches user from database and defaults to 0 if none exist

  const moneyTable = await Gold.findOne({ where: { user_id: user.id } });

  // Reports 0 gold if user entry doesn't exist
  if (!moneyTable) {
    return message.channel.send(`${name} has \`\`0\`\` gold.`);
  }

  message.channel.send(`${name} has \`\`${moneyTable.gold}\`\` gold.`);
 },
};
