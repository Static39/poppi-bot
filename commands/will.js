module.exports = {
  name: 'will',
  aliases: [],
  description: 'Asks Poppi something (8ball).',
  usage: '``?will Squish ever stop gambling?``',
  hidden: false,
  execute(_bot, message, args) {
  const user = message.author.id;
  let answer;

  if (!args[0]) return;

  const response = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  switch (response) {
    case 1:
      answer = 'Poppi is sure';
      break;
    case 2:
      answer = 'It very likely';
      break;
    case 3:
      answer = 'Yes';
      break;
    case 4:
      answer = 'Poppi believes so';
      break;
    case 5:
      answer = '.....No';
      break;
    case 6:
      answer = 'Chances *very* low';
      break;
    case 7:
      answer = 'Negative';
      break;
    case 8:
      answer = 'Poppi thinks probably not';
      break;
    case 9:
      answer = 'Poppi does not know';
      break;
    default:
      answer = 'Answer not found in database';
  }
  function sendResponse() {
    message.channel.stopTyping();
    message.channel.send(answer);
  }
  message.channel.startTyping();
  setTimeout(sendResponse, 3000);
 },
};
