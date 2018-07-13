//

const Discord = require('discord.js');
const client = new Discord.Client();

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
console.log(msg.content)

if (msg.channel.id == '379779029479194624') {
console.log(msg.content)
}

if (msg.channel.id == '399206894125973525') {
console.log(msg.content)
}

if (msg.channel.id == '448683172306354176') {
console.log(msg.content)
}
if (msg.channel.id == '448683172306354176') {
console.log(msg.content)
}
   
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
