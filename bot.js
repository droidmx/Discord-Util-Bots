const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('the Simulacrum', {
            type: 'WATCHING'
        }).then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', msg => {
  if (msg.author.id = '694303681197113374'){
    if (msg.content.toLowerCase().includes('b*rs')){
        msg.channel.send('no, bars');
        
    }}
  /*if (msg.content.toLowerCase().includes('bars')) {
   msg.channel.send({
            embed: {
                color: 0xFF0000,
                description: "**BARS ON BARS ON BARS**",
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© BARS Incorporated"
                }
            }
        });
    
  }*/
})

client.login(process.env.BOT_TOKEN);
