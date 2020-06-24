const { Profiles } = require('../dbObjects');

module.exports = {
  name: 'profile',
  aliases: ['p'],
  description: 'Displays a user\'s profile. Displays yours if no user is specified.',
  usage: '``?profile @SuperOtaku``',
  hidden: false,
  async execute(bot, message, args) {
    if (message.channel.type !== 'text') return;

    //Declares User variable
    const userMention = bot.targetFind(message, args[0]);

    //Sets avatar url
    const avy = userMention.displayAvatarURL();

    //Sets userId
    const userID = userMention.id;

    //Fetches user data from database
    const userData = await Profiles.findOne({ where: { user_id: userID } })

    //Check if the user has a profile
    if (!userData) {
      return message.channel.send('This user has not setup a profile');
    };


    //Declaration area
    const profile = userMention.username;
    const mal = userData.myanimelist;
    const char = userData.protagonist;
    const waifu = userData.waifu;
    const va = userData.voiceActor;
    const anime = userData.anime;


    const embed = {
      "title": `${profile}\'s Profile`,
      "url": `${mal}`,
      "color": 10299826,
      "thumbnail": {
        "url": `${avy}`
      },
      "fields": [
        {
          "name": "Favorite Protagonist:",
          "value": `\`\`${char}\`\``
        },
        {
          "name": "Waifu:",
          "value": `\`\`${waifu}\`\``
        },
        {
          "name": "Favorite VA:",
          "value": `\`\`${va}\`\``
        },
        {
          "name": "Favorite Anime:",
          "value": `\`\`${anime}\`\``
        }
      ]
    };
    message.channel.send({ embed });
  },
};
