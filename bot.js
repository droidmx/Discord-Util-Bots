const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
const ms = require('ms');
const yourID = "368756694114893825"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!createrolemessage"
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Tombs", "Davys", "Shatters", "Parasites", "Ocean Trenches", "LODs", "Ice Caves", "Candy Lands", "Nests", "Puppet Encores"];
const reactions = ["457281264656056334", "457282330168524800", "457283291230371862", "🇵", "457283651084746752", "457283904857047081", "<:icecave:457284349973364738>", "457285343205392395", "457285806659338241", "457286160696475650"];
client.on('ready', () => {
    client.user.setActivity('the nexus', { type: 'WATCHING' })
});
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get pings for **"${role}"**`); //DONT CHANGE THIS
    return messages;
}


client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == client.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != client.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});

client.on('guildMemberAdd', member => {


    member.user.send({
        embed: {
            color: 0x00FFFF,
            author: {
                name: `Guill the Watcher`,
                icon_url: client.user.avatarURL
            },
            fields: [{
                    name: "Welcome to ***Nexus Keys***!",
                    value: "To get started, read <#433789483222040577>! Once you have fully read the rules, go to <#433792597962522624> and follow the instructions to get notified for which dungeon you want!!",

                }

            ],
            footer: {
                text: ":warning: Nexus Keys Policy: The goal of this discord is **NOT** to crash or ruin runs. It is simply for users to partake in dungeons ONLY opened in the nexus, which are meant to be public anyways!",
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/icons/457258624574816267/0cafaa1a599e4d318aaa637cd6983dc6.jpg"
            }
        }
    });
});

client.on('message', async message => {
let args = message.content.toLowerCase().split(' ');
let msg = args.slice(0, -1).join(' ');
if (message.channel.id != '457259123566706740') {
    return;
}

if (message.author.id != '435395940715855872') {
    return;
}

if (message.startsWith('Parasite Chambers Portal')) {
    client.channels.get('457270832364912670').send(`<@&457261792763052032> \n ${msg}`)
    return;
}
if (message.startsWith('Tomb of the Ancients Portal')) {
    client.channels.get('457270832364912670').send(`<@&457261671006863392> \n ${msg}`)
    return;
}
if (message.startsWith('The Shatters')) {
    client.channels.get('457270832364912670').send(`<@&457261732100833313> \n ${msg}`)
    return;
}
if (message.startsWith("Davy Jones' Locker Portal")) {
    client.channels.get('457270832364912670').send(`<@&457261692750004254> \n ${msg}`)
    return;
}
if (message.startsWith("Lair of Draconis Portal")) {
    client.channels.get('457270832364912670').send(`<@&457262219940593664> \n ${msg}`)
    return;
}
if (message.startsWith("Ice Cave Portal")) {
    client.channels.get('457270832364912670').send(`<@&457262491232108544> \n ${msg}`)
    return;
}
if (message.startsWith("Candyland Portal")) {
    client.channels.get('457270832364912670').send(`<@&457262549902295061> \n ${msg}`)
    return;
}
if (message.startsWith("The Epic Hive Portal")) {
    client.channel.get('457270832364912670').send(`<@&457263144008548352> \n ${msg}`)
    return;
}
if (message.startsWith("The Epic Hive Portal")) {
    client.channels.get('457270832364912670').send(`<@&457263144008548352> \n ${msg}`)
    return;
}
if (message.startsWith("Puppet Encore Portal")) {
    client.channels.get('457270832364912670').send(`<@&457264788712587264> \n ${msg}`)
    return;
}
client.channels.get('457270832364912670').send(`${msg}`)

});



client.login(process.env.BOT_TOKEN);
