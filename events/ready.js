const { prfx } = require('../config.json');
exports.run = (bot) => {
  console.log('Poppi has logged in!');
  bot.user.setActivity('Type ?h for help', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
}
