const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('the Nexus | /help', {
            type: 'WATCHING'
        }).then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', msg => {
  
  if (msg.content.startsWith('bars')) {
   msg.channel.send("BARS ON BARS ON BARS"); 
    
  }
})

client.login(process.env.BOT_TOKEN);
