module.exports = {
  name: 'emoji',
  aliases: ['emojicreate'],
  description: 'Creates an emoji.',
  usage: '``?emoji AngryEye https://fakewebsite/pics/stupidpicture.png``',
  hidden: false,
  execute(bot, message, args) {
  if (message.channel.type !=='text') return;
  const user = message.author.id;

  const name = args[0] ||0;
  const content = args[1] || 0;
  const guild = message.guild;
//Checks if both name and content was specified
  if(name === 0 || content === 0) return;

  function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      return false;
    } else {
      return true;
    }
  }
  if(ValidURL(content)) {
    guild.createEmoji(content, name).then(emoji => {
      message.channel.send('Emoji created!');
})
    .catch(err => message.channel.send(`${err}`));
    
  }else {
    message.channel.send('Invalid URL.');
  }
 },
};
