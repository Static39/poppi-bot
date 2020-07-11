const config = require('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'supergivegold',
  aliases: ['sgg'],
  usage: '``?supergivegold @Tsukasa 1500``',
  hidden: true,
  async execute(bot, message, args) {
    if (message.channel.type !=='text') return;

    const target = bot.targetFind(message, args[0]);
    const gift = Number(args[1]);
    const user = message.author;

    // Checks if the user is the admin
    if (user.id !== config.ownerID) return;

    // Checks for valid target
    if (!target) return message.channel.send('Please specify user.');

    // Checks if target is Masterpon
    const name = bot.masterponCheck(target);

    // Makes sure the argument is a number
    if (!bot.numCheck(gift)) return;

    // Retrieves user's gold
    const targetData = await bot.goldCheck(Gold, target.id);

    // Sets gold variable
    let targetGold = targetData.gold;

    // Adds gift
    targetGold += gift;

    // Updates gold values
    try {
      await Gold.update({
        gold: targetGold,
        },
        { where: { user_id: target.id } });
    }
    catch(error) {
      console.log(error);
      message.channel.send('An error has occured. Please try again or contact Masterpon.');
    }

    message.channel.send(`${name} has been given \`\`${gift}\`\` gold.`);






  }
}
