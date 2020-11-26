const config = require ('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'setgold',
  aliases: ['sg'],
  description: 'Only bot owner can use this command. Sets the gold for a user.',
  usage: '`?setgold @Celestia 1000000`',
  hidden: false,
  async execute(bot, message, args) {
  if (message.author.id !== config.ownerID) return message.channel.send('Only Masterpon can use this command.');

  const user = bot.targetFind(message, args[0]);
  const gold = args[1];

  // Checks if user is Masterpon
  const name = bot.masterponCheck(user);

  if (!bot.numCheck(gold)) return message.channel.send('Invalid gold.');
  if (user === null) return message.channel.send('User not found.');

  // Updates gold values
  try {
    await Gold.update({
      gold: gold,
    }, { where: { user_id: user.id } });
    message.channel.send(`${name}\'s gold has been set to \`${gold}\`.`);
  }
  catch(error) {
    console.log(error);
    message.channel.send('An error occured. Please try again or contact Masterpon');
  }
 },
};
