module.exports = {
  name: 'GenerateLuminousElement',
  aliases: ['glm', 'GenerateLuminousElement', 'Generate_Luminous_Element'],
  description: '',
  usage: '',
  hidden: true,
  execute(bot, message, args) {
    return message.channel.send(':bulb:')
  },
};
