const { Tags } =  require('../dbObjects');

module.exports = {
  name: 'tag',
  aliases: ['t'],
  description: 'Displays a tag.',
  usage: '``?tag theTag``',
  hidden: false,
  async execute(_bot, message, args) {
  if (message.channel.type !=='text') return;

  const tag = args.join(' ').toLowerCase();

  const tagTable = await Tags.findOne({ where: { name: tag } });

  if (!tagTable) return message.channel.send('Tag does not exist.');

  message.channel.send(`${tagTable.content}`);
 },
};
