const CronJob = require('cron').CronJob;
const dateAdd = require('date-fns/add');
const formatRelative = require('date-fns/formatRelative');
const differenceInYears = require('date-fns/differenceInYears');

module.exports = {
  name: 'remind',
  aliases: ['reminder', 'rm'],
  description: 'Sets a reminder message to be sent at the specified date up to a year in the future.',
  usage: '\`\`?remind \"wake up\" 2mo 3w 5d 3h 8m 2s \`\`',
  hidden: false,
  execute(bot, message, args) {
    if (message.channel.type !== 'text') return;

    const currentDate = new Date();

    // Cuts the reminder message out of the args
    let msgContent = args.join(' ');
    const rMsg = msgContent.substring(msgContent.indexOf('\"'), msgContent.lastIndexOf('\"') + 1);
    const newArgs = msgContent.replace(rMsg, '').trim().split(' ');

    if(!rMsg) return message.channel.send('Please enter a reminder message.');

    // Dates
    let mo = 0;
    let w = 0;
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;

    if (!newArgs) return wrongDate();
    for (let element of newArgs) {

      const time = element.charAt(element.length - 1).toLowerCase();

      switch (time) {
        case 'o':
          if (element.charAt(element.length - 2).toLowerCase() !== 'm') {
            return;
          }
          if (!dateTest(element.replace('mo', ''), 12)) return wrongDate();
          mo = Number(element.replace('mo', ''));
          break;
        case 'w':
          if (!dateTest(element.replace('w', ''), 20)) return wrongDate();
          w = Number(element.replace('w', ''));
          break;
        case 'd':
          if (!dateTest(element.replace('d', ''), 366)) return wrongDate();
          d = Number(element.replace('d', ''))
          break;
        case 'h':
          if (!dateTest(element.replace('h', ''), 100)) return wrongDate();
          h = Number(element.replace('h', ''));
          break;
        case 'm':
          if (!dateTest(element.replace('m', ''), 2000)) return wrongDate();
          m = Number(element.replace('m', ''));
          break;
        case 's':
          if (!dateTest(element.replace('s', ''), 300000)) return wrongDate();
          s = Number(element.replace('s', ''));
          break;
        default:
          return wrongDate();
      }
    }

    const futureDate = dateAdd(currentDate, {
      months: mo,
      weeks: w,
      days: d,
      hours: h,
      minutes: m,
      seconds: s,
    });
    // Checks if time is over a year
    if (differenceInYears(currentDate, futureDate) > 0) return message.channel.send('Please set a closer time.');
    // Sets the cron job
    const job = new CronJob(futureDate, function() {
      message.channel.send(`${message.author}, you asked me to remind you:\n${rMsg.slice(1, -1)}`, {
        disableMentions: 'everyone'
      });
      this.stop();
    })
    job.start();

    const dateMsg = formatRelative(futureDate, currentDate);
    message.channel.send(`I\'ve set a reminder for ${dateMsg}`);

    // Functions
    function dateTest(num, count) {
      const dateNum = Number(num);
      if (bot.numCheck(dateNum)) {
          if (dateNum > count) return false;
          return true;
      } else {
          return false;
      }
    }

    function wrongDate() {
      message.channel.send('Please enter a valid date.');
    }
  }
}
