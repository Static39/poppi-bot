const { Tags } =  require('../dbObjects');

module.exports = {
  name: 'tagdelete',
  aliases: ['deletetag', 'td'],
  description: 'Deletes a tag.',
  usage: '`?tagdelete theTag`',
  hidden: false,
  async execute(_bot, message, args) {
  if (message.channel.type !=='text') return;

  const tag = args.join(' ').toLowerCase();
  const rowCount = await Tags.destroy({ where: { name: tag } });
  if (!rowCount) return message.reply('Tag does not exist.');

  message.channel.send(`\`${tag}\` has been deleted.`);
 },
};
