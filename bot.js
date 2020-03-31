const Discord = require('discord.js');
const client = new Discord.Client();
const music = require('discord.js-musicbot-addon');

client.on('message', msg => {
  if (msg.author.id != '368756694114893825') return;
})

client.login(process.env.BOT_TOKEN);
