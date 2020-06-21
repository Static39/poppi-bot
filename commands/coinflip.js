const config = require('../config.json');
const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'coinflip',
  aliases: ['cf', 'flip'],
  description: 'Flips a coin you can bet on. Flipping without betting just displays heads or tails.',
  usage: '``cf 100 t``',
  hidden: false,
  async execute(bot, message, args) {
  if (message.channel.type !=='text') return;


  const user = message.author.id;

  // Checks if it's Masterpon
  let name;
  if (message.author.id === config.ownerID) {
    name = 'Masterpon';
  } else {
    name = message.author.username;
  }

  // Retrieves user data
  const userData = await Gold.findOne({ where: { user_id: user } });
  let betText;
  let guess;

  // Makes the arguments reversible
  if (args[0] === 'h' || args[0] === 'heads') {
    betText = args[1];
    guess = args[0];
  }else if (args[0] === 't' || args[0] === 'tails') {
    betText = args[1];
    guess = args[0];
  }else {
    betText = args[0];
    guess = args[1];
  }

  let bet = Number(betText);
  let gold = userData.gold;

  // Checks for a real number
  if (!bot.numCheck(args[0])) bet = 0;

  // Checks if you have enough gold for the bet
  if (gold < bet) return message.channel.send(`${name} not have that much gold.`);

  if (Math.random() >= 0.5) {
    if (guess === 'h' || guess === 'heads') {
      message.channel.send(`${name} flipped Heads! ${name} won \`\`${bet}\`\` gold!`);
      gold += bet;
    }else if (guess === 't' || guess === 'tails') {
      message.channel.send(`${name} flipped Heads... ${name} lost \`\`${bet}\`\` gold.`);
      gold -= bet;
    }else message.channel.send(`${name} flipped Heads.`);

  } else {
    if (guess === 'h' || guess === 'heads') {
      message.channel.send(`${name} flipped Tails... ${name} lost \`\`${bet}\`\` gold.`);
      gold -= bet;
    }else if (guess === 't' || guess === 'tails') {
      message.channel.send(`${name} flipped Tails! ${name} won \`\`${bet}\`\` gold!`);
      gold += bet;
    }else message.channel.send(`${name} flipped Tails.`);
  }

  // Updates gold values
  try {
    await Gold.update({
      gold: gold,
    }, { where: { user_id: user } });
  }
  catch(error) {
    console.log(error);
    message.channel.send('An error occured. Please try again or contact Masterpon');
  }
 },
};
