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
        
         client.channels.get('441093729290289152').send("@here We are starting an afk check now, join queue and react with <:Shatters:433791162411646988> to be moved in!").then(newMessage => {
             
        newMessage.react(message.guild.emojis.get('433791162411646988'))
             .catch(console.error);
         })
        const filter = (reaction, user) => reaction.emoji.name === '433791162411646988' && user.id === '441086851642687488'
    newMessage.awaitReactions(filter, { time: 15000 })
       .then(collected => client.channels.get('441093729290289152').send(`Collected ${collected.size} reactions`))
        .catch(console.error);
        
         
       
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
