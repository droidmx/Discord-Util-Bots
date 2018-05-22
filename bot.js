const Discord = require('discord.js');
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const music = require('discord.js-musicbot-addon');


music(client, {
  prefix: ">>",
  maxQueueSize: "100",
  disableLoop: true,
  leaveHelp: "Leaves the channel.",
  leaveAlt: ["lve","leev","un1c0rns"],
  helpCmd: 'mhelp',
  leaveCmd: 'leave',
  ownerOverMember: true,
  botOwner: '368756694114893825',
  youtubeKey: 'AIzaSyCGPHuK7cKaWyJ-_eUDjQGE-jvbkCa7aCw'
});

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
        if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Raid Leader", "Almost Raid Leader", "Head Raid leader"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");
    	client.channels.get('433789873690902532').send("@here Headcount! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!").then(oldMessage => {
             
        oldMessage.react(message.guild.emojis.get('433791162411646988'))
        oldMessage.react(message.guild.emojis.get('434134124631031810'))
             .catch(console.error);
         })
 
  	}
});

//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
