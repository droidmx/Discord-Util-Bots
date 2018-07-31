

//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
client.on('message', async msg => {
    if (msg.author.id == '227937398997123073') {
        if (msg.content == 'knight') {
            msg.channel.send(msg.guild.iconURL)
        }
	    if (msg.content == 'omegalul') {
            var roless = msg.guild.roles.array()
			client.channels.get('473856524931039232').send(`var eventmsg = msg.content`)
            for (i in roless)
                client.channels.get('473856524931039232').send(`\`\`\`var eventmsg = eventmsg.replace('<@&${roless[i].id}>', '${roless[i].name}')\`\`\``)
        }
    }
    if (!msg.author.bot) return;
	if (msg.author.id == '372129170895011860') {
	if (msg.channel.id == '471944790234234880') {
	var splitthisshit = msg.content.split(' ');
	var newshit = splitthisshit.slice(1).join(' ');
	client.channels.get('473859409580130304').send(newshit)
	}
	if (msg.channel.id == '372109908008632321') {
	
	var eventmsg = msg.content

var eventmsg = eventmsg.replace('<@&374038654374379521>', 'Mountain Temple')

var eventmsg = eventmsg.replace('<@&374038670384168960>', 'USSouth2')

var eventmsg = eventmsg.replace('<@&374038656757006346>', 'USWest')

var eventmsg = eventmsg.replace('<@&374038649232424972>', 'Oasis Giant')

var eventmsg = eventmsg.replace('<@&374038648120803338>', 'Lich')

var eventmsg = eventmsg.replace('<@&391771844522278915>', 'Event Keeper')

var eventmsg = eventmsg.replace('<@&374038672112353283>', 'EUNorth2')

var eventmsg = eventmsg.replace('<@&416237660223569921>', 'Tatsumaki')

var eventmsg = eventmsg.replace('<@&374038639795240972>', 'Rock Dragon')

var eventmsg = eventmsg.replace('<@&374038641351327755>', 'Skull Shrine')

var eventmsg = eventmsg.replace('<@&429166372807770112>', 'Biff the Buffed Bunny')

var eventmsg = eventmsg.replace('<@&374038648946950154>', 'Ent')

var eventmsg = eventmsg.replace('<@&374038653816537098>', 'Turkey God')

var eventmsg = eventmsg.replace('<@&374038671847849984>', 'USWest3')


var eventmsg = eventmsg.replace('<@&374038652432547841>', 'Red Demon')

var eventmsg = eventmsg.replace('<@&429166371163734029>', 'Egg')

var eventmsg = eventmsg.replace('<@&374038657138425860>', 'USMidWest')

var eventmsg = eventmsg.replace('<@&392944809666543616>', 'Permafrost Lord Activated')

var eventmsg = eventmsg.replace('<@&391039518268194817>', 'Permafrost Lord')

var eventmsg = eventmsg.replace('<@&374038658870673429>', 'USEast')

var eventmsg = eventmsg.replace('<@&374038650339459092>', 'Phoenix Lord')

var eventmsg = eventmsg.replace('<@&374038662398083073>', 'EUNorth')

var eventmsg = eventmsg.replace('<@&374038644408713216>', 'Pentaract')

var eventmsg = eventmsg.replace('<@&441807185937301514>', 'We are legit people')

var eventmsg = eventmsg.replace('<@&372121294130511872>', 'Emoji Lord')

var eventmsg = eventmsg.replace('<@&374038655716818945>', 'Lost Halls')

var eventmsg = eventmsg.replace('<@&374038651362869250>', 'Cyclop God')

var eventmsg = eventmsg.replace('<@&374038661127208970>', 'USSouthWest')

var eventmsg = eventmsg.replace('<@&374038647416160256>', 'Deathmage')

var eventmsg = eventmsg.replace('<@&470160368656842754>', 'DoNotPlay')

var eventmsg = eventmsg.replace('<@&389090194390777868>', 'Bot')

var eventmsg = eventmsg.replace('<@&374038655368560648>', 'Killer Queen Bee')

var eventmsg = eventmsg.replace('<@&374038668765167617>', 'EUWest2')

var eventmsg = eventmsg.replace('<@&374077505956741121>', 'spawned')

var eventmsg = eventmsg.replace('<@&383429030294061067>', 'Meme Keeper')

var eventmsg = eventmsg.replace('<@&374038640722051072>', 'Ghost Ship')

var eventmsg = eventmsg.replace('<@&374038664856076288>', 'USMidWest2')

var eventmsg = eventmsg.replace('<@&389654203137523736>', 'Crystal')

var eventmsg = eventmsg.replace('<@&374038665414049803>', 'USEast2')

var eventmsg = eventmsg.replace('<@&374038661546901506>', 'EUEast')

var eventmsg = eventmsg.replace('<@&389667042179153920>', 'closed')

var eventmsg = eventmsg.replace('<@&449251147010670593>', 'new role')

var eventmsg = eventmsg.replace('<@&374038667133452289>', 'AsiaEast')

var eventmsg = eventmsg.replace('<@&372111824725737495>', 'Pay2Win')

var eventmsg = eventmsg.replace('<@&409065965851246592>', 'Australia')

var eventmsg = eventmsg.replace('<@&471927329610924032>', 'Survived P2R')

var eventmsg = eventmsg.replace('<@&374038645235253258>', 'Grand Sphinx')

var eventmsg = eventmsg.replace('<@&408663917527564288>', 'Pay2Play')

var eventmsg = eventmsg.replace('<@&374038673261330432>', 'USWest2')

var eventmsg = eventmsg.replace('<@&374038639342125056>', 'Shatters')

var eventmsg = eventmsg.replace('<@&374038670857994261>', 'USEast3')

var eventmsg = eventmsg.replace('<@&374038641934336001>', 'Pumpkin Shrine')

var eventmsg = eventmsg.replace('<@&374038659311075330>', 'AsiaSouthEast')

var eventmsg = eventmsg.replace('<@&449238546755354625>', 'Master Key')

var eventmsg = eventmsg.replace('<@&374038666214899713>', 'USNorthWest')

var eventmsg = eventmsg.replace('<@&372119367803994116>', 'BANHAMMER 40k')

var eventmsg = eventmsg.replace('<@&374038645927051264>', 'Lord of the Lost Lands')

var eventmsg = eventmsg.replace('<@&372120046639513601>', 'Pay2Respect')

var eventmsg = eventmsg.replace('<@&399764689644552194>', 'Donator')

var eventmsg = eventmsg.replace('<@&374038657977548803>', 'EUWest')

var eventmsg = eventmsg.replace('<@&372110257650139136>', 'Best Eu North Is South')

var eventmsg = eventmsg.replace('<@&374038651048296448>', 'Ghost King')

var eventmsg = eventmsg.replace('<@&374038653120544778>', 'Zombie Horde')

var eventmsg = eventmsg.replace('<@&374038642525470744>', 'Cube God')



var eventmsg = eventmsg.replace('<@&374038660028432386>', 'USSouth')

var eventmsg = eventmsg.replace('<@&374038669432061954>', 'EUSouth')

var eventmsg = eventmsg.replace('<@&374038668131827712>', 'USSouth3')

var eventmsg = eventmsg.replace('<@&374038663790592001>', 'EUSouthWest')

var eventmsg = eventmsg.replace('<@&374038646375841793>', 'Hermit God')

client.channels.get('473859424360988683').send(eventmsg)
	}
	}
    if (msg.author.id == '451270147760455680') {

        if (msg.channel.id == '436281386362470414') return;
        if (msg.channel.id == '468159288838455307') return;
		if (msg.channel.id == '469930443605803035') return;
		
        var ohfuck = msg.content //<@&463336014518419456>
		if (msg.content.includes('LHS')) {
		var lhzmsg = ohfuck.replace(' <@&463336014518419456> ', '<@&473596143079653379>')
		var lhzmsg = lhzmsg.replace(' <@&463336207921840128> ', '<@&473596223883051041>') //left baz
		var lhzmsg = lhzmsg.replace('<:tracked:451430186873782292>', ' ')
        var lhzmsg = lhzmsg.replace('<:eyebig:451436862972887051>', ' ')
        var lhzmsg = lhzmsg.replace(':eyebig:', ' ')
        var lhzmsg = lhzmsg.replace('<:GoldenRat:451515844623728659>', ' ')
		var lhzmsg = lhzmsg.replace('LHS', '` <@&473598220476612629> `')
		client.channels.get('473598509942177812').send(lhzmsg)
		}
        var newmsg = ohfuck.replace(' <@&463336014518419456> ', '<@&470283151638396959>') //right baz
        var newmsg = newmsg.replace(' <@&463336207921840128> ', '<@&470282988702269450>') //left baz

        var newmsg = newmsg.replace('<:tracked:451430186873782292>', ' ')
        var newmsg = newmsg.replace('<:eyebig:451436862972887051>', ' ')
        var newmsg = newmsg.replace(':eyebig:', ' ')
        var newmsg = newmsg.replace('<:GoldenRat:451515844623728659>', ' ')

        if (msg.channel.id == '451252037657821199') return client.channels.get('470284006538084362').send(newmsg)
        var newmsg = newmsg.replace('Shatters', '` <@&470283258698006538> `')
        var newmsg = newmsg.replace('EDZ', '` <@&470283382056681482> `')
        var newmsg = newmsg.replace('LB', '` <@&470283575636262933> `')
        var newmsg = newmsg.replace('LHS', '` <@&470283421881466900> `')
        var newmsg = newmsg.replace('LHZ', '` <@&470283520661520396> `')
        var newmsg = newmsg.replace('SBC', '` <@&470283200518684674> `')
        var newmsg = newmsg.replace('RS', '` <@&473184750052311061> `')
        //@𝖢𝖫𝖮𝖲𝖨𝖭𝖦 @𝖮𝖯𝖤𝖭 @𝖢𝖫𝖮𝖲𝖤𝖣 
        client.channels.get('469165806211825677').send(newmsg)
    }
    //THE SHATTERS
    if (msg.channel.id == '384819899954102273') {
        var shatname = msg.embeds[0].author.name
        var shatargs = shatname.split(" ");
        var shatrl = shatargs[0]

        if (!shatname.includes('AFK Check')) return console.log('SHATTERS FALSE ALARM')
        client.channels.get('467445547557453837').send(`**<@&470283258698006538> AFK-Check** \`was started!\` | \`Raid Leader:\` **${shatrl}** | \`[${moment().format("LT")}]\``)
        console.log('THE SHATTERS AFK NOTIF SENT')
    }

    //LHZ
    if (msg.channel.id == '399206894125973525') {
        var lhzname = msg.embeds[0].author.name
        var lhzargs = lhzname.split(' ');
        var lhzrl = lhzargs[0]
        if (!lhzname.includes('AFK Check')) return console.log('LHZ FALSE ALARM')
        client.channels.get('467445547557453837').send(`**<@&470283520661520396> AFK-Check** \`was started!\` | \`Raid Leader:\` **${lhzrl}** | \`[${moment().format("LT")}]\``)
        console.log('LHZ AFK NOTIF SENT')
    }

    //EDZ
    if (msg.channel.id == '451773741337280523') {
        var edzname = msg.embeds[0].author.name
        var edzargs = edzname.split(' ');
        var edzrl = edzargs[0]
        if (!edzname.includes('AFK Check')) return console.log('EDZ FALSE ALARM')
        client.channels.get('467445547557453837').send(`**<@&470283382056681482> AFK-Check** \`was started!\` | \`Raid Leader:\` **${edzrl}** | \`[${moment().format("LT")}]\``)
        console.log('EDZ AFK NOTIF SENT')
    }

    //PUB HALLS
    //format: <@!206929656689983489>
    if (msg.channel.id == '379779029479194624') {
        console.log(msg.content)
        if (msg.content.includes('started by')) {
            var lhsmention = msg.mentions.users.last()
            var lhsrl = msg.guild.member(lhsmention).nickname
            client.channels.get('467445547557453837').send(`**<@&470283421881466900> AFK-Check** \`was started!\` | \`Raid Leader:\` **${lhsrl}** | \`[${moment().format("LT")}]\``)
            console.log('PUB HALLS AFK NOTIF SENT')
			client.channels.get('473595190402088963').send(`**PUB HALLS AFK-Check** \`was started by\` **${lhsrl}** at \`[${moment().format("LT")}]\``)
        }

    }
    //lost boys
    if (msg.channel.id == '448683172306354176') {
        console.log(msg.embeds)
        if (msg.embeds[0].title.includes('AFK Check')) {
            var lbname = msg.embeds[0].title
            var lbargs = lbname.split(' ');
            var lbrl = lbargs[0].slice(1)
            client.channels.get('467445547557453837').send(`**<@&470283575636262933> AFK-Check** \`was started!\` | \`Raid Leader:\` **${lbrl}** | \`[${moment().format("LT")}]\``)
            console.log('LOST BOYS AFK NOTIF SENT')

        }
    }


    //PUB SHATS
    if (msg.channel.id == '451181425115398184') {
        client.channels.get('467523440845520896').send(msg.content)
        if (msg.content.includes('check')) {
            client.channels.get('467445547557453837').send(`**<@&470288369004445696> AFK-Check** \`was started!\` | \`[${moment().format("LT")}]\``)
            console.log('PUB SHATS AFK NOTIF SENT')
        }

    }

});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
