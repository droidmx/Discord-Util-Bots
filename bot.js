const Discord = require('discord.js');
const bot = new Discord.Client();



bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});
bot.on('message', message => {
    if (message.content === '!headcount') {
    	bot.channels.get('433789873690902532').send("@here a headcount is starting! React with :Shatters: if you wish to participate, and :Key: if you have a key!")
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
