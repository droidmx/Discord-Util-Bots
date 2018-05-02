const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./package.json");
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

let prefix = "()";
//todo can parameterize later
let REACT_TIMEOUT = 20 * 1000; // 20sec
let isHeadcounting = false; // manaages state
let shattersEmoji = message.guild.emojis.get('433791162411646988');
let keyEmoji = message.guild.emojis.get('434134124631031810');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (command == 'ping') {
    message.channel.send("pong!");
  } else
  if (command == 'foo') {
    message.channel.send("bar!");
  }
});

client.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (command == 'headcount') {
    	client.channels.get('433789873690902532').send("@here Headcount! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!").then(oldMessage => {
             
            oldMessage.react(shattersEmoji)
            oldMessage.react(keyEmoji).catch(console.error);
            
         })
 
  	}
});

client.on('message', message => {
     if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    if (command == 'afk') {
        
         client.channels.get('441093729290289152').send("@here We are starting an afk check now, join queue and react with <:Shatters:433791162411646988> to be moved in!").then(newMessage => {
             
        newMessage.react(message.guild.emojis.get('433791162411646988'))
             .catch(console.error);
         })
        const reactionFilter = (reaction, user) => {
                return reaction.emoji.id === shattersEmoji.id || reaction.emoji.id === keyEmoji.id;
            });
        let respChannel = client.channels.get('441093729290289152');
            newMessage.awaitReactions(reactionFilter, { time: REACT_TIMEOUT })
                .then(collectedEmojis => respChannel.send(`Collected ${collectedEmojis.size}`)).catch(console.error);
 
         
       
  	}
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
