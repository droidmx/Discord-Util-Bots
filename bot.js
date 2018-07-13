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
if (msg.channel.id == '467445547557453837') {
 client.channels.get('467436171664949249').send(msg.content)   
    
}



   
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
