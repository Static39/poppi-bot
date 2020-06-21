const { Gold } = require('../dbObjects');
const config = require('../config.json');

module.exports = {
  name: 'rps',
  aliases: [],
  description: 'Plays a game of Rock, Paper, Scissors. You can also bet on results.',
  usage: '``?rps rock 150``',
  hidden: false,
  async execute(_bot, message, args) {

    const user = message.author.id;
    const nameUser = message.author;
    const userData = await Gold.findOne({ where: { user_id: user } });

    const newChoice = args.shift();
    const botChoice = Math.floor((Math.random() * 3) + 1);

    // Checks if it's Masterpon
    let name;
    if (nameUser.id === config.ownerID) {
      name = 'Masterpon';
    }
    else {
      name = nameUser.username;
    }

    if (!newChoice) return message.channel.send('Please choose ``rock``, ``paper`` or ``scissors``');
    let choice = newChoice.toLowerCase();
    if (choice === 'rock') choice = 'r';
    if (choice === 'paper') choice = 'p';
    if (choice === 'scissors') choice = 's';

    let finalText;
    let bet = Number(args);
    let gold = userData.gold;
    // Checks if the bet is a number
    if (Number.isNaN(bet)) bet = 0;
    // Checks if the bet is a negative
    if (bet < 0) bet = 0;
    // Checks if the bet is a whole number
    if (bet % 1 !== 0) bet = 0;
    // Checks if you have enough gold for the bet
    if (gold < bet) return message.channel.send('You don\'t have that much gold.');
    let winCheck;
    let winString;

    switch (choice) {
    case 'r':
      if (botChoice === 1) {
        winString = 'Poppi used Rock. It was a tie.';
        winCheck = null;
      }
      else if (botChoice === 2) {
        winString = `Poppi used Paper. ${name} loses...`;
        winCheck = 0;
      }
      else {
        winString = `Poppi used Scissors. ${name} wins!`;
        winCheck = 1;
      }
      break;
    case 'p':
      if (botChoice === 1) {
        winString = `Poppi used Rock. ${name} wins!`;
        winCheck = 1;
      }
      else if (botChoice === 2) {
        winString = 'Poppi used Paper. It was a tie.';
        winCheck = null;
      }
      else {
        winString = `Poppi used Scissors. ${name} loses...`;
        winCheck = 0;
      }
      break;
    case 's':
      if (botChoice === 1) {
        winString = `Poppi used Rock. ${name} loses...`;
        winCheck = 0;
      }
      else if (botChoice === 2) {
        winString = `Poppi used Paper. ${name} wins!`;
        winCheck = 1;
      }
      else {
        winString = 'Poppi used Scissors. It was a tie.';
        winCheck = null;
      }
      break;
    default:
      message.channel.send('Please choose: ``rock``, ``paper`` or ``scissors``.');

    }
    if (bet > 0 && winCheck === 0) {
      gold -= bet;
      finalText = winString.concat(`\nLost \`\`${bet}\`\` gold.`);
    }
    else if (bet > 0 && winCheck === 1) {
      gold += bet;
      finalText = winString.concat(`\nWon \`\`${bet}\`\` gold.`);
    }
    else {
      finalText = winString;
    }

    //Updates gold values
    try {
      await Gold.update({
        gold: gold,
      }, { where: { user_id: user } });
    }
    catch(error) {
      console.log(error);
      message.channel.send('An error has occured. Please try again or contact Masterpon.');
    }

    //Sends the results
    message.channel.send(finalText);

  },
};
