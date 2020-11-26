const { Tags } =  require('../dbObjects');

module.exports = {
  name: 'taglist',
  aliases: ['tl'],
  description: 'Displays all tags.',
  usage: '`?taglist`',
  hidden: false,
  async execute(_bot, message, _args) {
  if (message.channel.type !=='text') return;

// Fetches the tags from the database
  const getTags = await Tags.findAll({ attributes: ['name'] });
  const displayTags = getTags.map(t => t.name).join('\n') || 'No tags set.';

  const embed = {
  "color": 10299826,
  "fields": [
    {
      "name": "Tags:",
      "value": `${displayTags}`
    }
  ]
};
message.channel.send({ embed });
 },
};
