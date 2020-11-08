module.exports = {
  name: 'smash',
  aliases: ['ssbu'],
  description: 'Chooses a random SSBU character.',
  usage: '``?smash``',
  hidden: false,
  execute(_bot, message, _args) {

    const rdm = Math.floor((Math.random() * 80) + 1);
    let chr;

    switch (rdm) {
      case 1:
        chr = "Mario";
        break;
      case 2:
        chr = "Luigi";
        break;
      case 3:
        chr = "Bowser";
        break;
      case 4:
        chr = "Peach";
        break;
      case 5:
        chr = "Daisy";
        break;
      case 6:
        chr = "Wario";
        break;
      case 7:
        chr = "Donkey Kong";
        break;
      case 8:
        chr = "Diddy Kong";
        break;
      case 9:
        chr = "Bowser Jr.";
        break;
      case 10:
        chr = "Pirahna Plant";
        break;
      case 11:
        chr = "Yoshi";
        break;
      case 12:
        chr = "Rosalina & Luma";
        break;
      case 13:
        chr = "King K. Rool";
        break;
      case 14:
        chr = "Dr. Mario";
        break;
      case 15:
        chr = "Lucina";
        break;
      case 16:
        chr = "Ike";
        break;
      case 17:
        chr = "Roy";
        break;
      case 18:
        chr = "Chrom";
        break;
      case 19:
        chr = "Corrin";
        break;
      case 20:
        chr = "Robin";
        break;
      case 21:
        chr = "Marth";
        break;
      case 22:
        chr = "Link";
        break;
      case 23:
        chr = "Zelda";
        break;
      case 24:
        chr = "Sheik";
        break;
      case 25:
        chr = "Young Link";
        break;
      case 26:
        chr = "Ganondorf";
        break;
      case 27:
        chr = "Toon Link";
        break;
      case 28:
        chr = "Samus";
        break;
      case 29:
        chr = "Zero Suit Samus";
        break;
      case 30:
        chr = "Kirby";
        break;
      case 31:
        chr = "Meta Knight";
        break;
      case 32:
        chr = "King Dedede";
        break;
      case 33:
        chr = "Fox";
        break;
      case 34:
        chr = "Falco";
        break;
      case 35:
        chr = "Wolf";
        break;
      case 36:
        chr = "Pikachu";
        break;
      case 37:
        chr = "Jigglypuff";
        break;
      case 38:
        chr = "Pichu";
        break;
      case 39:
        chr = "Mewtwo";
        break;
      case 40:
        chr = "Pokemon Trainer";
        break;
      case 41:
        chr = "Lucario";
        break;
      case 42:
        chr = "Greninja";
        break;
      case 43:
        chr = "Captain Falcon";
        break;
      case 44:
        chr = "Ness";
        break;
      case 45:
        chr = "Lucas";
        break;
      case 46:
        chr = "Ice Climbers";
        break;
      case 47:
        chr = "Mr. Game & Watch";
        break;
      case 48:
        chr = "Pit";
        break;
      case 49:
        chr = "Palutena";
        break;
      case 50:
        chr = "Pittoo";
        break;
      case 51:
        chr = "Olimar";
        break;
      case 52:
        chr = "R.O.B.";
        break;
      case 53:
        chr = "Villager";
        break;
      case 54:
        chr = "Wii Fit Trainer";
        break;
      case 55:
        chr = "Little Mac";
        break;
      case 56:
        chr = "Shulk";
        break;
      case 57:
        chr = "Duck Hunt";
        break;
      case 58:
        chr = "Snake";
        break;
      case 59:
        chr = "Sonic";
        break;
      case 60:
        chr = "Mega Man";
        break;
      case 61:
        chr = "Pac-Man";
        break;
      case 62:
        chr = "Ryu";
        break;
      case 63:
        chr = "Cloud";
        break;
      case 64:
        chr = "Bayonetta";
        break;
      case 65:
        chr = "Mii Brawler";
        break;
      case 66:
        chr = "Mii Swordfighter";
        break;
      case 67:
        chr = "Mii Gunner";
        break;
      case 68:
        chr = "Ridley";
        break;
      case 69:
        chr = "Dark Samus";
        break;
      case 70:
        chr = "Incineroar";
        break;
      case 71:
        chr = "Isabelle";
        break;
      case 72:
        chr = "Inkling";
        break;
      case 73:
        chr = "Ken";
        break;
      case 74:
        chr = "Simon";
        break;
      case 75:
        chr = "Richter";
        break;
      case 76:
        chr = "Joker";
        break;
      case 77:
        chr = "Hero";
        break;
      case 78:
        chr = "Banjo-kazooie";
        break;
      case 79:
        chr = "Terry";
        break;
      case 80:
        chr = "Byleth";
        break;
      case 81:
        chr = "Min Min";
        break;
      case 82:
        chr = "Steve";
        break;
      default:
        return message.channel.send("An error occured. Please contact Masterpon.");
      }
    message.channel.send(`__**${chr}**__`);
  },
};
