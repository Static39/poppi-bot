const { Gold } =  require('../dbObjects');

module.exports = {
  name: 'dual',
  aliases: ['fight', 'shoubu'],
  description: 'Challenges a user to a dual. User can be specified or omitted. Bets can also be placed.',
  usage: '``?dual @Kirito 1000``',
  hidden: false,
  async execute(bot, message, args) {
    if (message.channel.type != 'text') return

    // Variables
    let target;
    let bet;
    let requestText
    const userData = await Gold.findOne({ where: { user_id: message.author.id } })
    let userGold;

    if (userData) {
      userGold = userData.gold;
    }
    else {
      userGold = 0;
    }


    // Checks if the first argument is a user
    if (bot.targetFind(message, args[0]) === null) {
      // If the first argument isn't a user check for a number
      if (!bot.numCheck(args[0])) {
        return message.channel.send('Please enter a valid user user')
      } else {
        bet = Number(args[0]);
        // Checks if user has enough gold
        if (bet > userGold) return message.channel.send('Not enough gold.');
        target = false;
        requestText = ''
      }
    }

    // Takes the first argument as a user
    else {
      target = bot.targetFind(message, args[0])
      if (target === message.author) {
        requestText = '';
        target = false;
      }
      else {
        requestText = ` with ${target}`;
      }
      bet = bot.numCheck(args[1]) ? Number(args[1]) : 0;
      // Checks if user has enough gold
      if (bet > userGold) return message.channel.send('Not enough gold');
    }


    message.channel.send(`${message.author.username} has requested a dual${requestText} for \`\`${bet}\`\`g!`)
    .then(() => {
      message.channel.awaitMessages(response => {
        // Checks if the response author is the same as message sender
        if (message.author.id !== response.author.id && response.author.bot === false) {
          target = target ? target : response.author;
          if (target === response.author && response.content.toLowerCase() === 'accept') {
            return true;
          }
         }
        },
       {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
      .then(async (collected) => {
          const targetData = await Gold.findOne({ where: { user_id: collected.first().author.id } });
          let targetGold;

          if (targetData) {
            targetGold = targetData.gold;
          }
          else {
            targetGold = 0;
          }

          if (bet > targetGold) return message.channel.send('Not enough gold.');

          const dualM = message.channel.send(`${target.username} accepted the dual!\nNow starting the dual...`, {
            files: [{
              attachment: './assets/dual.gif',
              name: 'dual.gif'
            }]
          });
          setTimeout(async () => {
            // Chooses winner
            if (Math.random() >= 0.5) {
              message.channel.send(`${message.author.username} won the dual!`);

              userGold += bet;
              targetGold -= bet;
            }
            else {
              message.channel.send(`${collected.first().author.username} won the dual!`)

              userGold -= bet;
              targetGold += bet;
            }

            // Deletes the dual gif
            dualM.delete()
            .catch(error => {
              console.log(error);
            });
            // Updates database
            try {
              await Gold.update({
                gold: userGold ,
              }, { where: { user_id: message.author.id } });
              await Gold.update({
                gold: targetGold,
              }, { where: { user_id: target.id } })
            }
            catch(error) {
              console.log(error);
              message.channel.send('An error occured. Please try again or contact Masterpon');
            }
          }, 25000)
          })
          .catch(() => {
            message.channel.send('No one accepted the dual.');
          });
    });
  }
}
