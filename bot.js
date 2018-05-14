const Discord = require('discord.js');
const client = new Discord.Client();




client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'abcdefghiklmnopqrstuvwxyz') {
    	message.guild.member(message.author).addRole("325863963487240203");
  	}
});

client.on('message', message => {
    if (message.content === '!headcount') {
    	client.channels.get('433789873690902532').send("@here Headcount! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!").then(oldMessage => {
             
        oldMessage.react(message.guild.emojis.get('433791162411646988'))
        oldMessage.react(message.guild.emojis.get('434134124631031810'))
             .catch(console.error);
         })
 
  	}
});



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
//test
