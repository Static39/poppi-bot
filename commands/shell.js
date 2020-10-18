const config = require('../config.json');
const execSync = require('child_process').execSync;

module.exports = {
  name: 'shell',
  aliases: [],
  description: 'Runs a command in the terminal.',
  usage: '``?shell ls``',
  hidden: true,
  async execute(_bot, message, args) {
    if (message.author.id !== config.ownerID) return;

    const shellCmd = args.join(' ') || 'ls';
    try {
      const output = execSync(shellCmd, { encoding: 'utf-8' });
      await message.channel.send(`${output}`, { split: true, code: 'shell' });
    }
    catch(error) {
      message.channel.send(`ERROR:\n${error.stderr}`, { split: true, code: 'shell' });
    }
  }
}
