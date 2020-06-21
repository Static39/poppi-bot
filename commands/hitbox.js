const fetch = require('node-fetch');

module.exports = {
    name: 'hitbox',
    aliases: ['hb', 'move'],
    description: 'Displays the hitbox of a character\'s normal move in Smash Ultimate',
    usage: '``?hitbox mario utilt',
    hidden: false,
    async execute(_bot, message, args) {
        if (message.channel.type !== 'text') return;

        if (!args[0]) return message.channel.send('Please specify a valid character.');
        const moveArg = args.pop().toLowerCase();
        let move;

        if (!args[0]) return message.channel.send('Please specify a valid move');
        const characterArg = args.join(' ').toLowerCase().replace(/\./, '');
        let charURL;
        let character;

        switch (characterArg) {
            case 'mario':
                charURL = 'mario';
                character = 'Mario';
                break;
            case 'luigi':
                charURL = 'luigi';
                character = 'Luigi';
                break;
            case 'bowser':
                charURL = 'bowser';
                character = 'Boswer';
                break;
            case 'peach':
                charURL = 'peach';
                character = 'Peach';
                break;
            case 'daisy':
                charURL = 'daisy';
                character = 'Daisy';
                break;
            case 'wario':
                charURL = 'wario';
                character = 'Wario';
                break;
            case 'donkey kong':
                charURL = 'donkey_kong';
                character = 'DonkeyKong';
                break;
            case 'diddy kong':
                charURL = 'diddy_kong';
                character = 'DiddyKong';
                break;
            case 'bowser jr':
                charURL = 'bowser_jr';
                character = 'BowserJr';
                break;
            case 'pirahna plant':
                charURL = 'pirahna_plant';
                character = 'PirahnaPlant';
                break;
            case 'yoshi':
                charURL = 'yoshi';
                character = 'Yoshi';
                break;
            case 'rosalina':
                charURL = 'rosalina_and_luma';
                character = 'Rosalina';
                break;
            case 'luma':
                charURL = 'rosalina_and_luma';
                character = 'Luma';
                break;
            case 'king k rool':
                charURL = 'king_k_rool';
                character = 'KingKRool';
                break;
            case 'dr mario':
                charURL = 'dr_mario';
                character = 'DrMario';
                break;
            case 'lucina':
                charURL = 'lucina';
                character = 'Lucina';
                break;
            case 'roy':
                charURL = 'roy';
                character = 'Roy';
                break;
            case 'chrom':
                charURL = 'chrom';
                character = 'Chrom';
                break;
            case 'marth':
                charURL = 'marth';
                character = 'Marth';
            case 'ike':
                charURL = 'ike';
                character = 'Ike';
                break;
            case 'corrin':
                charURL = 'corrin';
                character = 'Corrin';
                break;
            case 'robin':
                charURL = 'robin';
                character = 'Robin';
                break;
            case 'link':
                charURL = 'link';
                character = 'Link';
                break;
            case 'zelda':
                charURL = 'zelda';
                character = 'Zelda';
                break;
            case 'ganondorf':
                charURL = 'ganondorf';
                character = 'Ganondorf';
                break;
            case 'young link':
                charURL = 'young_link';
                character = 'YoungLink';
                break;
            case 'toon link':
                charURL = 'toon_link';
                character = 'ToonLink';
                break;
            case 'sheik':
                charURL = 'sheik';
                character = 'Sheik';
                break;
            case 'samus':
                charURL = 'samus';
                character = 'Samus';
                break;
            case 'zero suit samus':
                charURL = 'zero_suit_samus';
                character = 'ZeroSuitSamus';
                break;
            case 'kirby':
                charURL = 'kirby';
                character = 'Kirby';
                break;
            case 'meta knight':
                charURL = 'meta_knight';
                character = 'MetaKnight';
                break;
            case 'king dedede':
                charURL = 'king_dedede';
                character = 'KingDedede';
                break;
            case 'fox':
                charURL = 'fox';
                character = 'Fox';
                break;
            case 'falco':
                charURL = 'falco';
                character = 'Falco';
                break;
            case 'wolf':
                charURL = 'wolf';
                character = 'Wolf';
                break;
            case 'pikachu':
                charURL = 'pikachu';
                character = 'Pikachu';
                break;
            case 'jigglypuff':
                charURL = 'jigglypuff';
                character = 'Jigglypuff';
                break;
            case 'pichu':
                charURL = 'pichu';
                character = 'Pichu';
                break;
            case 'mewtwo':
                charURL = 'mewtwo';
                character = 'Mewtwo';
                break;
            case 'pokemon trainer':
                charURL = 'pokemon trainer';
                character = 'PokemonTrainer';
                break;
            case 'lucario':
                charURL = 'lucario';
                character = 'Lucario';
                break;
            case 'greninja':
                charURL = 'greninja';
                charURL = 'Greninja';
                break;
            case 'captain falcon':
                charURL = 'captain_falcon';
                character = 'CaptainFalcon';
                break;
            case 'ness':
                charURL = 'ness';
                character = 'Ness';
                break;
            case 'lucas':
                charURL = 'lucas';
                character = 'Lucas';
                break;
            case 'ice climbers':
                charURL = 'ice_climbers';
                character = 'IceClimbers';
                break;
            case 'mr game and watch':
                charURL = 'mr_game_and_watch';
                character = 'MrGameAndWatch';
                break;
            case 'pit':
                charURL = 'pit';
                character = 'Pit';
                break;
            case 'palutena':
                charURL = 'palutena';
                character = 'Palutena';
                break;
            case 'dark pit':
                charURL = 'dark_pit';
                character = 'DarkPit';
                break;
            case 'olimar':
                charURL = 'olimar';
                character = 'Olimar';
                break;
            case 'rob':
                charURL = 'rob';
                character = 'ROB';
                break;
            case 'villager':
                charURL = 'villager';
                character = 'Villager';
                break;
            case 'wii fit trainer':
                charURL = 'wii_fit_trainer';
                character = 'WiiFitTrainer';
                break;
            case 'little mac':
                charURL = 'little_mac';
                character = 'LittleMac';
                break;
            case 'shulk':
                charURL = 'shulk';
                character = 'Shulk';
                break;
            case 'duck hunt':
                charURL = 'duck_hunt';
                character = 'DuckHunt';
                break;
            case 'snake':
                charURL = 'snake';
                character = 'Snake';
                break;
            case 'sonic':
                charURL = 'sonic';
                character = 'Sonic';
                break;
            case 'mega man':
                charURL = 'mega_man';
                character = 'MegaMan';
                break;
            case 'pac-man':
                charURL = 'pac_man';
                character = 'PacMan';
                break;
            case 'ryu':
                charURL = 'ryu';
                character = 'Ryu';
                break;
            case 'cloud':
                charURL = 'cloud';
                character = 'Cloud';
                break;
            case 'bayonetta':
                charURL = 'bayonetta';
                character = 'Bayonetta';
                break;
            case 'mii brawler':
                charURL = 'mii_brawler';
                character = 'MiiBrawler';
                break;
            case 'mii swordfighter':
                charURL = 'mii_swordfighter';
                character = 'MiiSwordfighter';
                break;
            case 'mii gunner':
                charURL = 'mii_gunner';
                character = 'MiiGunner';
                break;
            case 'ridley':
                charURL = 'ridley';
                character = 'Ridley';
                break;
            case 'dark samus':
                charURL = 'dark_samus';
                character = 'DarkSamus';
                break;
            case 'incineroar':
                charURL = 'incineroar';
                character = 'Incineroar';
                break;
            case 'isabelle':
                charURL = 'isabelle';
                character = 'Isabelle';
                break;
            case 'inkling':
                charURL = 'inkling';
                character = 'Inkling';
                break;
            case 'ken':
                charURL = 'ken';
                character = 'Ken';
                break;
            case 'simon':
                charURL = 'simon';
                character = 'Simon';
                break;
            case 'richter':
                charURL = 'richter';
                character = 'Richter';
                break;
            case 'Joker':
                charURL = 'joker';
                character = 'Joker';
                break;
            case 'hero':
                charURL = 'hero';
                character = 'Hero';
                break;
            case 'banjo-kazooie':
                charURL = 'banjo_kazooie';
                character = 'BanjoKazooie';
                break;
            case 'terry':
                charURL = 'terry';
                character = 'Terry';
                break;
            case 'byleth':
                charURL = 'byleth';
                character = 'Byleth';
                break;
            default:
                return message.channel.send('Please enter a valid character.');
        }


        switch (moveArg) {
            case 'jab':
                move = 'Jab1';
                break;
            case 'jab1':
                move = 'Jab1';
                break;
            case 'jab2':
                move = 'Jab2';
                break;
            case 'jab3':
                move = 'Jab3';
                break;
            case 'rapidjab':
                move = 'JabRapid';
                break;
            case 'rapidJabFinish':
                move = 'JabRapidEnd';
                break;
            case 'ftilt':
                move = 'FTilt';
                break;
            case 'utilt':
                move = 'UTilt';
                break;
            case 'dtilt':
                move = 'DTilt';
                break;
            case 'dashAttack':
                move = 'DashAttack';
                break;
            case 'fsmash':
                move = 'FSmash';
                break;
            case 'usmash':
                move = 'DSmash';
                break;
            case 'dsmash':
                move = 'DSmash';
                break;
            case 'nair':
                move = 'NAir';
                break;
            case 'fair':
                move = 'FAir';
                break;
            case 'bair':
                move = 'BAir';
                break;
            case 'dair':
                move = 'DAir';
                break;
            case 'grab':
                move = 'Grab';
                break;
            case 'dashGrab':
                move = 'DashGrab';
                break;
            case 'pivotGrab':
                move = 'PivotGrab';
                break;
            case 'pummel':
                move = 'Pummel';
                break;
            case 'fthrow':
                move = 'FThrow';
                break;
            case 'bthrow':
                move = 'BThrow';
                break;
            case 'uthrow':
                move = 'UThrow';
                break;
            case 'dthrow':
                move = 'DThrow';
                break;
            default:
                return message.channel.send('Please specify a valid move.');
        }

        const embed = {
            "title": `${character} ${move}`,
            "color": 10299826,
            "footer": {
                "text": "Frame data and hitboxes provided by https://ultimateframedata.com"
            },
            "image": {
                "url": `https://ultimateframedata.com/hitboxes/${charURL}/${character}${move}.gif`
            }
        }

        message.channel.send({ embed });

    }

}