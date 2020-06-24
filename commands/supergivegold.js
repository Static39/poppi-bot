const config = require('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'supergivegold',
  aliases: ['sgg'],
  usage: '``?supergivegold @Tsukasa 1500``',
  hidden: true,
  async execute(bot, message, args) {
    const target = bot.targetFind(message, args[0]);
    const gift = Number(args[1]);
    const user = message.author.id;

    //Checks if the user is the admin
    if (user !== config.ownerID) return;
    if (message.channel.type !=='text') return;

    //Checks if it's Masterpon
    let name;
    if (message.author.id === config.ownerID) {
      name = 'Masterpon';
    } else {
      name = message.author.username;
    }

    //Makes sure the argument is a number
    if (Number.isNaN(gift)) return;

    if (!target) return message.channel.send('Please specify user.');
    const targetId = target.id;

    //Checks if target is Masterpon
    let name2;
    if (target.id === config.ownerID) {
      name2 = 'Masterpon';
    } else {
      name2 = target.username;
    }

    //Checks to see if the user table exists
    if(!await Gold.findOne({ where: {user_id: targetId } })) {
      await Gold.create({
        user_id: targetId,
      });
    }

    //Retrieves user's gold
    const targetData = await Gold.findOne({ where: { user_id: targetId} });

    //Sets gold variable
    let targetGold = targetData.gold;

    //Adds gift
    targetGold += gift;

    //Updates gold values
    try {
      await Gold.update({
        gold: targetGold,
        },
        { where: { user_id: targetId } });
    }
    catch(error) {
      console.log(error);
      message.channel.send('An error has occured. Please try again or contact Masterpon.');
    }

    message.channel.send(`${target.username} has been given \`\`${gift}\`\` gold.`);






  }
}
