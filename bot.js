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
    }
    if (!msg.author.bot) return;
	if (msg.channel.id == '436281824583483402') {
		console.log(msg.embeds)
		console.log(msg.embeds[0].fields[0])
		console.log(msg.embeds[0].fields[1])
		console.log(msg.embeds[0].fields[2])
		//console.log(msg.toString)
		//console.log(msg.mentions)
		
		}
    if (msg.author.id == '451270147760455680') {

        if (msg.channel.id == '436281386362470414') return;
        if (msg.channel.id == '468159288838455307') return;
		
		
        var ohfuck = msg.content //<@&463336014518419456>

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
