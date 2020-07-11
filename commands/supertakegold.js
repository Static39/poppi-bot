const config = require('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'supertakegold',
  aliases: ['stg'],
  usage: '``?supertakegold @Tsukasa 1500``',
  hidden: true,
  async execute(bot, message, args) {
    if (message.channel.type !=='text') return;

    const target = bot.targetFind(message, args[0]);
    const gift = Number(args[1]);
    const user = message.author;

    // Checks for valid target
    if (!target) return message.channel.send('Please specify user.');

    // Checks if the user is the admin
    if (user.id !== config.ownerID) return;

    // Checks if target Masterpon
    const name = bot.masterponCheck(target);

    // Makes sure the gift is a number
    if (!bot.numCheck(gift)) return;

    // Retrieves user data
    const targetData = await bot.goldCheck(Gold, target.id);
    let targetGold = targetData.gold;
    targetGold -= gift;

    // Returns if value is less than 0
    if (targetGold < 0) return message.channel.send(`${name} not have that much gold.`);

    // Updates gold values
    try {
      await Gold.update({
        gold: targetGold,
        },
        { where: { user_id: target.id } });
    }
    catch(error) {
      console.log(error);
      messsage.channel.send('An error has occured. Please try again or contact Masterpon.');
    }

    message.channel.send(`\`\`${gift}\`\` gold has been taken from ${name}`);






  }
}
