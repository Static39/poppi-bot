const { Gold } = require('../dbObjects');

module.exports = {
  name: 'leaderboard',
  aliases: ['lb'],
  description: 'Displays the gold leaderboard.',
  usage: '``?leaderboard``',
  hidden: false,
  async execute(_bot, message, _args) {

    // Fetches gold table
    const data = await Gold.findAll({ attributes: ['user_id', 'gold'], limit: 15, order: [['gold', 'DESC'],], });
    try {
      // Gets guild members
      const gUsers = await message.guild.members.fetch();
      let users = await data.map(u => {
        if (gUsers.has(u.user_id)) {
          const usr = gUsers.get(u.user_id);
          return `${usr.user.username} - ${u.gold} :yen:`;
        }
      });

      // Filters out users that aren't in guild
      const usersFilt = users.filter(element => {
        if (element) return element;
      });
      let values = [];
      usersFilt.forEach((element, index) => {
        const str = `#${index + 1} `;
        values.push(str.concat(element));
      });
      
      // Message embed
      const embed = {
        "color": 10299826,
        "fields": [
          {
            "name": "**__Leaderboard:__**",
            "value": `${values.join('\n')}`
          }
        ]
      };
      message.channel.send({ embed });


    }
    catch (error) {
      console.log(error);
      message.channel.send('An error has occurred. Please try again later or contact Masterpon.');
    }
  }
}
