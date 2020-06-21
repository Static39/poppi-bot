const config = require('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'givegold',
  aliases: ['gg'],
  description: 'Gives gold to the specified user.',
  usage: '``?givegold @greed 9999``',
  hidden: false,
  async execute(bot, message, args) {

  if (message.channel.type !=='text') return;

  // Variable declaration
  const target = bot.targetFind(message, args[0]);
  const gift = Number(args[1]) || 0;
  const user = message.author.id;

  // Checks if it's Masterpon
  let name;
  if (message.author.id === config.ownerID) {
    name = 'Masterpon';
  } else {
    name = message.author.username;
  }

  // Checks if the argument is a valid number
  if (!bot.numCheck(args[1])) return message.channel.send('Please enter a valid number.');

  // Checks if user is valid
  if (target === message.author || target === null) {
    return message.channel.send('Please specify valid user.');
  };
  const targetId = target.id;
  // Checks if target is Masterpon
  let name2;
  if (target.id === config.ownerID) {
    name2 = 'Masterpon';
  } else {
    name2 = target.username;
  }

  // Creates a user table if none exist
  if(!await Gold.findOne({ where: {user_id: user } })) {
    await Gold.create({
      user_id: user,
    });
  }
  if(!await Gold.findOne({ where: {user_id: targetId } })) {
    await Gold.create({
      user_id: targetId,
    });
  }

  // Retrieves users' data
  const userData = await Gold.findOne({ where: {user_id: user} });
  const targetData = await Gold.findOne({ where: {user_id: targetId} });

  // Sets gold variables
  let userGold = userData.gold;
  let targetGold = targetData.gold;

  // Adds/subtracts gold from users and returns if the user is short on gold
  userGold -= gift;
  targetGold += gift;

  if (userGold < 0) return message.channel.send(`${name} not have that much gold.`);

  // Updates the gold values for users
  try {
    await Gold.update({
      gold: userGold,
      },
      { where: { user_id: user} });

    await Gold.update({
      gold: targetGold,
      },
      { where: { user_id: targetId } });
  }
  catch (error) {
    console.log(error)
    return messsage.channel.send('Something went wrong. Please try again or contact Masterpon.');
  }


  message.channel.send(`${target.username} has been given \`\`${gift}\`\` gold.`);
 },
};
