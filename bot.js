const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

client.on('message', message => {
    if (message.content === '!headcount') {
    	client.channels.get('433789873690902532').send("@here a Headcount is starting! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!");
  	}
});

client.on('message', message => {
    if (message.content === '!afk') {
        var new = client.channels.get('441093729290289152').send("@here afk check testing")
        new.react(message.guild.emojis.get('433791162411646988'));
       
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
