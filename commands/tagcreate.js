const { Tags } =  require('../dbObjects');

module.exports = {
  name: 'tagcreate',
  aliases: ['createtag', 'tc', 'ct'],
  description: 'Creates a tag.',
  usage: '``?tagcreate theTag Why does this tag exist?``',
  hidden: false,
  async execute(_bot, message, args) {
  if (message.channel.type !=='text') return;

// Takes the first argument and uses it for the tag name.
  const tag = args.shift().toLowerCase();
  
// Takes the rest of the message and uses it for the content of the tag.
  const value = args.join(' ');

// Checks if the tag exists
  if(await Tags.findOne({ where: { name: tag } })) {
    return message.channel.send('This tag already exists.');
  }

// Creates a new tag entry
  await Tags.create({
    name: tag,
    content: value,
  });

  message.channel.send(`The tag \`\`${tag}\`\` has been created.`);
 },
};
