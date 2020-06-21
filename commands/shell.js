const config = require('../config.json');

module.exports = {
  name: 'shell',
  aliases: [],
  description: 'Runs a command in the terminal.',
  usage: '?shell ls',
  hidden: true,
  async execute(_bot, message, args) {
    if (message.author.id !== config.ownerID) return;

    const shellCmd = args.join(' ') || 'ls';
    try {
      const execSync = await require('child_process').execSync;
      const output = await execSync(shellCmd, { encoding: 'utf-8' })  // the default is 'buffer'
      await console.log('Output was:\n', output);
      await message.channel.send(`${output}`, { split: true });
    }
    catch(error) {
      console.log(error);
    }
  }
}
