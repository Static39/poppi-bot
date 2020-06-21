const fetch = require('node-fetch');
const nodeCache = require('node-cache');
const timeCache = new nodeCache();

module.exports = {
  name: 'stages',
  aliases: ['maps'],
  description: 'Displays the current Splatoon 2 stages. Use ``?stages next`` for the next rotation.',
  usage: '``?stages``',
  hidden: false,
  async execute(_bot, message, args) {
    if (message.channel.type !== 'text') return;

    const date = new Date();
    const curDate = Math.floor(date.getTime() / 1000);



    let sploonStages = timeCache.get('splatTime');

    // Checks if the stages have updated
    if (!sploonStages || sploonStages.regular[0].end_time < curDate) {

      try {
        // Fetches the rotation information
        response = await fetch('https://splatoon2.ink/data/schedules.json');
        if (response.ok) {
          sploonStages = await response.json();
          timeCache.del('splatTime');
          timeCache.set('splatTime', sploonStages);
        }
      }
      catch (error) {
        console.log(error);
        return message.channel.send('Stages cannot be accessed right now.');
      }
    }
    let wording;
    let curStage;

    if (args[0] === 'next') {
      wording = 'In';
      curStage = 1;
    }
    else {
      wording = 'Next Rotation';
      curStage = 0;
    }

    // Converts seconds to hours and minutes remaining
    const distance = ((sploonStages.regular[0].end_time - curDate) + 60);
    const hours = Math.floor((distance / 60) / 60);
    const minutes = Math.floor(distance / 60 - (hours * 60));

    // Message embed
    const embed = {
      "title": `${wording}: ${hours}h ${minutes}m`,
      "color": 10299826,
      "footer": {
        "text": "Stage info provided by https://splatoon2.ink"
      },
      "fields": [
        {
          "name": `Regular: ${sploonStages.regular[curStage].rule.name}`,
          "value": `__**${sploonStages.regular[curStage].stage_a.name}**__ & __**${sploonStages.regular[curStage].stage_b.name}**__`
        },
        {
          "name": `Ranked: ${sploonStages.gachi[curStage].rule.name}`,
          "value": `__**${sploonStages.gachi[curStage].stage_a.name}**__ & __**${sploonStages.gachi[curStage].stage_b.name}**__`
        },
        {
          "name": `League: ${sploonStages.league[curStage].rule.name}`,
          "value": `__**${sploonStages.league[curStage].stage_a.name}**__ & __**${sploonStages.league[curStage].stage_b.name}**__`
        }
      ]
    };
    return message.channel.send({ embed });
  }
};
