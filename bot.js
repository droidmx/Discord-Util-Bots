const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

var user = args.slice(0).join("");

let rcode = ("SC" + Math.floor(Math.random(11111) * 99999));

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
    	client.channels.get('433789873690902532').send("@here Headcount! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!").then(oldMessage => {
             
        oldMessage.react(message.guild.emojis.get('433791162411646988'))
        oldMessage.react(message.guild.emojis.get('434134124631031810'))
             .catch(console.error);
         })
 
  	}
});

client.on('message', message => {
    if (message.content === '!afk') {
        
         client.channels.get('441093729290289152').send("@here We are starting an afk check now, join queue and react with <:Shatters:433791162411646988> to be moved in!").then(newMessage => {
             
        newMessage.react(message.guild.emojis.get('433791162411646988'))
             .catch(console.error);
         })
 
         
       
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
