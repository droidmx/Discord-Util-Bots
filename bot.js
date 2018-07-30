//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

client.on('message', async msg => {

  
if (msg.channel.id == '467701033292922882') {
 if (msg.author.id == '430085482542530562') {
  if (msg.content.includes('opened in')) {
   client.channels.get('473601354665820160').send(msg.content)   
      
      
      
  }   
 }   
}




});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
