const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'givegold',
  aliases: ['gg'],
  description: 'Gives gold to the specified user.',
  usage: '`?givegold @greed 9999`',
  hidden: false,
  async execute(bot, message, args) {

  if (message.channel.type !=='text') return;

  // Variable declaration
  const target = bot.targetFind(message, args[0]);
  const gift = Number(args[1]) || 0;
  const user = message.author;


  // Checks if user is valid
  if (target === message.author || target === null) {
    return message.channel.send('Please specify valid user.');
  };

  // Checks if the argument is a valid number
  if (!bot.numCheck(args[1])) return message.channel.send('Please enter a valid number.');

  // Checks if it's Masterpon
  const name = bot.masterponCheck(user);

  // Checks if target is Masterpon
  const targetName = bot.masterponCheck(target);

  // Retrieves users' data
  const userData = await bot.goldCheck(Gold, user.id);
  const targetData = await bot.goldCheck(Gold, target.id);

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
      { where: { user_id: user.id} });

    await Gold.update({
      gold: targetGold,
      },
      { where: { user_id: target.id } });
  }
  catch (error) {
    console.log(error)
    return messsage.channel.send('Something went wrong. Please try again or contact Masterpon.');
  }


  message.channel.send(`${targetName} has been given \`${gift}\` gold.`);
 },
};
