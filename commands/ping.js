module.exports = {
  name: 'ping',
  aliases: ['spam', 'troll'],
  description: 'Pings a user until they come online or for 10 pings. You can stop it by typing \`\`stop\`\`.',
  usage: '``?ping @Kazuma``',
  hidden: false,
  execute(bot, message, args) {

    // Makes sure the channel is in a server
    if (message.channel.type !== 'text') return;

    // Gets the user object from the message and returns if not found
    const target = bot.targetFind(message, args[0]);
    if (!target) return message.channel.send('Please specify a valid user.');

    // Checks if already running
    if (bot.user.presence.status === 'idle') {
      return message.channel.send('Ping command is already running. Please wait for it to end before starting another.');
    }
    else {
        try {
          bot.user.setPresence({status: 'idle'});
        }
        catch(error) {
          console.log(error);
        }
    }

    // Timer function
    // This function needs to be updated
    function timer(ms) {
      return new Promise(res => setTimeout(res, ms));
    }

    //Pings until 20th ping or user comes online
    message.channel.send(`Pinging ${target.username}...`);
    async function pinging() {
      for (let i = 0; i < 10 && target.presence.status !== 'online'; i++) {
        if (message.author.lastMessage.content.toLowerCase().includes('stop')) {
          bot.user.setPresence({status: 'online'});
          return message.channel.send(`Stopped pinging ${target.username}.`);
        }
        message.channel.send(`${target}`);
        await timer(15000);
      };
      if (target.presence.status === 'online') {
        message.channel.send(`${target.username} is online!`);
      }
      else {
        message.channel.send(`${target.username} never came online...`);
      }
      bot.user.setPresence({status: 'online'});
    };
    pinging();
  },
};
