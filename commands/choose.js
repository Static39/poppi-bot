module.exports = {
  name: 'choose',
  aliases: ['choice', 'pick'],
  description: 'Chooses between given options. Split options with an apostrophe. Can take up to 10 options.',
  usage: '``?choose Poppi a, Poppi QT, Poppi QT Pi``',
  hidden: false,
  execute(_bot, message, args) {
    // Makes comand only available in text channel
    if (message.channel.type !== 'text') return;

    const joinedArgs = args.join(' ');
    const choiceArray = joinedArgs.split(',');

    if (choiceArray.length > 10) return message.channel.send('Too many choices.');
    const botChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)];
    message.channel.send(botChoice);
  },
};
