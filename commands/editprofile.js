const { Profiles } =  require('../dbObjects');

module.exports = {
  name: 'editprofile',
  aliases: ['profileedit', 'ep'],
  description: 'Edits your profile. The different options are:\nmal\nprotagonist\nwaifu\nva\nanime',
  usage: '`?editprofile protagonist Ryuko Matoi`',
  hidden: false,
  async execute(_bot, message, args) {
  if (message.channel.type !=='text') return;

  const authorId = message.author.id;

  //Creates a row for the user if none exist
  if(!await Profiles.findOne({ where: { user_id: authorId } })) {
    await Profiles.create({
      user_id: authorId,
    });
  };

  //Declaration
  const userData = await Profiles.findOne({ where: { user_id: authorId } });
  let mal = userData.myanimelist;
  let protag = userData.protagonist;
  let waifu = userData.waifu;
  let va = userData.voiceActor;
  let anime = userData.anime;

  
  switch (args[0]) {
    case 'mal':
      args.shift();
      console.log(args.join(' '));
      const content = args.join(' ');
      if(content.startsWith('https://myanimelist.net')) {
        args.shift();
        mal = content;
      } else {
      return message.channel.send('Please enter a valid MAL profile URL.');
      }
      break;
    case 'protagonist':
      args.shift();
      protag = args.join(' ');
      break;
    case 'waifu':
      args.shift();
      waifu = args.join(' ');
      break;
    case 'va':
      args.shift();
      va = args.join(' ');
      break;
    case 'anime':
      args.shift();
      anime = args.join(' ');
      break;
    default:
      return message.channel.send('Please enter a valid field. Use ``?help editprofile`` for more details.');
  }
  try {
    await Profiles.update({
      myanimelist: mal,
      protagonist: protag,
      waifu: waifu,
      voiceActor: va,
      anime: anime,
      },
      { where: { user_id: authorId } });
  }
  catch (error) {
    console.log(error);
    return message.channel.send('\`\`An error occured\`\`');
  }
  message.channel.send('Profile successfully updated!');
  },
};
