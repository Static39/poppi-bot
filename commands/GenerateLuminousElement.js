module.exports = {
  name: 'GenerateLuminousElement',
  aliases: ['glm', 'GenerateLuminousElement', 'Generate_Luminous_Element'],
  description: '',
  usage: '',
  hidden: true,
  execute(_bot, message, _args) {
    return message.channel.send(':bulb:')
  },
};
