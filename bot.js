//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async msg => {
if (msg.author.id == '368756694114893825') {
    if (msg.content == 'lmfao') {
    var roless = msg.guild.roles.array()
			client.channels.get('473856524931039232').send(`var trackmsg = msg.content`)
            for (i in roless) client.channels.get('467532711960248321').send(`\`\`\`var trackmsg = eventmsg.replace('<@&${roless[i].id}>', '${roless[i].name}')\`\`\``)    
        
    }
    
}
  if (msg.author.id == '430085482542530562') {
if (msg.channel.id == '467701033292922882') {
 
  if (msg.content.includes('opened in')) {
   client.channels.get('473601354665820160').send(msg.content)       
  }   
 }   
   if (msg.channel.id == '467701268358365195') {
    console.log(msg.content)
       console.log(msg.embeds[0].description)
   }
}




});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
