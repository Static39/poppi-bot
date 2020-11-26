const isSameDay = require('date-fns/isSameDay');
const parseISO = require('date-fns/parseISO');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'addgold',
  aliases: ['ag'],
  description: 'Gives 300 gold every 24h.',
  usage: '\`?addgold\`',
  hidden: false,
  async execute(bot, message, _args) {
  if (message.channel.type !=='text') return;

  const user = message.author;

  // Checks if it's Masterpon
  const name = bot.masterponCheck(user)

  let curDate = new Date();
  let curDateString = curDate.toISOString();

  // Creates a row for the user if none exist
  const moneyTable = await bot.goldCheck(Gold, user.id);

  // Fetches user's gold
  let gold = moneyTable.gold;

  // Checks if the time is up
  const result = isSameDay(parseISO(moneyTable.last_collect), curDate);

  if (!result) {

    gold += 300;

    // Bonus gold chance
    const chance = Math.floor(Math.random() * (20) + 1);
    if (chance === 1) {
      gold += 1200;
      message.channel.send(`${name} got the bonus! ${name} has been given 1500g.`);
    } else {
      message.channel.send(`${name} has been given 300g. ${name} have \`${gold}g\``);
    }

    // Updates the table
    try {
      await Gold.update({
        gold: gold,
        last_collect: curDateString,
        },
        { where: { user_id: user.id } });
    }
    catch (error) {
      console.log(error);
      return message.channel.send('An error occured.');
    }

  } else {
    message.channel.send(`${name} must wait until tomorrow to recieve more gold.`);
  }

 },
};
