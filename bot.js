//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

client.on('ready', () => {
    console.log('I am ready!');
});


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
client.on('message', async msg => {
if (!msg.author.bot) return;


//THE SHATTERS
if (msg.channel.id == '384819899954102273') {
    console.log(msg.embeds)
var shatname = msg.embeds[0].author.name
var shatargs = shatname.split(" ");
var shatrl = shatargs[0]
client.channels.get('467445547557453837').send(`**Shatters AFK-Check was started!** | Raid Leader: **${shatrl}** | \`[${moment().format("LT")}]\``)
}

//LHZ
if (msg.channel.id == '399206894125973525') {
    console.log(msg.embeds)
var lhzname = msg.embeds[0].author.name
var lhzargs = lhzname.split(' ');
var lhzrl = lhzargs[0]
client.channels.get('467445547557453837').send(`**LHZ AFK-Check was started!** | Raid Leader: **${lhzrl}** | \`[${moment().format("LT")}]\``)
}

//EDZ
if (msg.channel.id == '451773741337280523') {
    console.log(msg.embeds)
var edzname = msg.embeds[0].author.name
var edzargs = edzname.split(' ');
var edzrl = edzargs[0]
client.channels.get('467445547557453837').send(`**EDZ AFK-Check was started!** | Raid Leader: **${edzrl}** | \`[${moment().format("LT")}]\``)
}
   
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
