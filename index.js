const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        return console.log('No commands found...')
    } else {
        console.log(jsfiles.length + ' commands loaded.')
    }
    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        bot.commands.set(cmds.config.command, cmds);
    })
})

bot.on('message', msg => {
if (msg.author.id != '368756694114893825') return;
let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    let cmd = bot.commands.get(cont[0]);
if (cmd) cmd.run(bot, message, args);


});

bot.login('MzY4NzU2Njk0MTE0ODkzODI1.Db9Png.eF6iN7PzyQV5KUbzNXUCEielXPw');
