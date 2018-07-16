//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

client.on('ready', () => {
    console.log('I am ready!');
});


function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
client.on('message', async msg => {
    if (!msg.author.bot) return;


    //THE SHATTERS
    if (msg.channel.id == '384819899954102273') {
        var shatname = msg.embeds[0].author.name
        var shatargs = shatname.split(" ");
        var shatrl = shatargs[0]
        client.channels.get('467445547557453837').send(`**The Shatters AFK-Check was started!** | Raid Leader: **${shatrl}** | \`[${moment().format("LT")}]\``)
    }

    //LHZ
    if (msg.channel.id == '399206894125973525') {
        var lhzname = msg.embeds[0].author.name
        var lhzargs = lhzname.split(' ');
        var lhzrl = lhzargs[0]
        client.channels.get('467445547557453837').send(`**LHZ AFK-Check was started!** | Raid Leader: **${lhzrl}** | \`[${moment().format("LT")}]\``)
    }

    //EDZ
    if (msg.channel.id == '451773741337280523') {
        var edzname = msg.embeds[0].author.name
        var edzargs = edzname.split(' ');
        var edzrl = edzargs[0]
        client.channels.get('467445547557453837').send(`**EDZ AFK-Check was started!** | Raid Leader: **${edzrl}** | \`[${moment().format("LT")}]\``)
    }

    //PUB HALLS
    //format: <@!206929656689983489>
    if (msg.channel.id == '379779029479194624') {
        console.log(msg.content)
        if (msg.content.includes('AFK check')) {
            var lhsmention = msg.mentions.users.last()
            var lhsrl = msg.guild.member(lhsmention).nickname
            client.channels.get('467445547557453837').send(`**PUB HALLS AFK-Check was started!** | Raid Leader: **${lhsrl}** | \`[${moment().format("LT")}]\``)
        }

    }

    if (msg.channel.id == '448683172306354176') {
        console.log(msg.embeds[0].author.name)
        console.log(msg.embeds)
        var lbname = msg.embeds[0].author.name
        var lbargs = lbname.split(' ');
        var lbrl = lbargs[0]
        client.channels.get('467445547557453837').send(`**Lost Boys AFK-Check was started!** | Raid Leader: **UNKNOWN, WORK IN PROGRESS** | \`[${moment().format("LT")}]\``)
        client.channel.get('467523440845520896').send('<@227937398997123073> LB afk started check logs')
    }


    //PUB SHATS
    if (msg.channel.id == '451181425115398184') {
        if (msg.content.includes('AFK Check')) {
            client.channels.get('467445547557453837').send(`**Pub Shatts AFK-Check was started!** | Raid Leader: **${lbrl}** | \`[${moment().format("LT")}]\``)
        }

    }

});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
