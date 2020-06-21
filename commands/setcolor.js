const config = require('../config.json');

module.exports = {
  name: 'setcolor',
  aliases: [],
  description: 'Can only be used be by bot owner. Changes a role\'s color.',
  usage: '``?setcolor`` FFFF',
  hidden: true,
  execute(bot, message, args) {
  const user = message.author.id;
  if (user !== config.ownerID) return;


  const role = message.mentions.roles.first();
  const color = args[1];
  if (!role || !args[1]) return;

  role.setColor(color).then(nRole => {
         message.channel.send(`This role's color has been set to ${role.color}.`);
}).catch(err => message.channel.send(`${err}`));


 },
};
