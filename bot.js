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
        client.channels.get('467445547557453837').send(`**<@&467420984916312064> AFK-Check was started!** | Raid Leader: **${shatrl}** | \`[${moment().format("LT")}]\``)
    }

    //LHZ
    if (msg.channel.id == '399206894125973525') {
        var lhzname = msg.embeds[0].author.name
        var lhzargs = lhzname.split(' ');
        var lhzrl = lhzargs[0]
        client.channels.get('467445547557453837').send(`**<@&467421140877574165> AFK-Check was started!** | Raid Leader: **${lhzrl}** | \`[${moment().format("LT")}]\``)
    }

    //EDZ
    if (msg.channel.id == '451773741337280523') {
        var edzname = msg.embeds[0].author.name
        var edzargs = edzname.split(' ');
        var edzrl = edzargs[0]
        client.channels.get('467445547557453837').send(`**<@&468932208376414229> AFK-Check was started!** | Raid Leader: **${edzrl}** | \`[${moment().format("LT")}]\``)
    }

    //PUB HALLS
    //format: <@!206929656689983489>
    if (msg.channel.id == '379779029479194624') {
        console.log(msg.content)
        if (msg.content.includes('AFK check')) {
            var lhsmention = msg.mentions.users.last()
            var lhsrl = msg.guild.member(lhsmention).nickname
            client.channels.get('467445547557453837').send(`**<@&467421029631787018> AFK-Check was started!** | Raid Leader: **${lhsrl}** | \`[${moment().format("LT")}]\``)
        }

    }

    if (msg.channel.id == '448683172306354176') {
      console.log(msg.embeds)
      if (msg.embeds[0].title.includes('AFK Check')) {
      var lbname = msg.embeds[0].title
      var lbargs = lbname.split(' ');
      var lbrl = lbargs[0].slice(1)
        client.channels.get('467445547557453837').send(`**<@&468932303339388929> AFK-Check was started!** | Raid Leader: **${lbrl}** | \`[${moment().format("LT")}]\``)
       
        }
    }


    //PUB SHATS
    if (msg.channel.id == '451181425115398184') {
        if (msg.content.includes('AFK Check')) {
            client.channels.get('467445547557453837').send(`**<@&468933020343336961> AFK-Check was started!** | \`[${moment().format("LT")}]\``)
        }

    }

});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
