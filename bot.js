const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
const ms = require('ms');
const moment = require('moment')
const yourID = "368756694114893825"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!createrolemessage"
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Tombs", "Davys", "Shatters", "Parasites", "Ocean Trenches", "LODs", "Ice Caves", "Candy Lands", "Puppet Encores", "Lost Halls", "Epic Dungeons", "Various Dungeons"];
const reactions = ["457281264656056334", "457282330168524800", "457283291230371862", "🇵", "457283651084746752", "457283904857047081", "457284349973364738", "457285343205392395", "457286160696475650", "457352595820904458", "457352404091011106", "457352455890665474"];
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

    var memberrole = member.guild.roles.find('name', 'Member');
    member.addRole(memberrole)
    client.channels.get('457266459807055883').send(`Welcome ${member} to Nexus Keys!`)
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
                text: `⚠ Nexus Keys Policy: The goal of this discord is **NOT** to crash or ruin runs. It is simply for users to partake in dungeons ONLY opened in the nexus, which are meant to be public anyways!`,
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/icons/457258624574816267/0cafaa1a599e4d318aaa637cd6983dc6.jpg"
            }
        }
    });
});

client.on('message', async message => {
let args = message.content.split(' ');
let msg = args.slice(0, -1).join(' ');


if (message.author.id != '435395940715855872') {
    return;
}
    if (message.channel.id == '457281496294621195') {
    var tracked = `__${args[0]}__ `
        if (message.content.includes('entered in')) {
        
        tracked += '\`entered\` '
        if (message.content.includes('**USEast2**')) {
     tracked += ' <@&465896364060966922> '
     }
             if (message.content.includes('**USWest**')) {
     tracked += '<@&465895420078325790> '
     }
             if (message.content.includes('**USSouth**')) {
     tracked += '<@&465895487447367680> '
     }
     if (message.content.includes('**USNorthWest**')) {
     tracked += '<@&465895535274885130> '
     }
     if (message.content.includes('**USSouth2**')) {
     tracked += '<@&465895591617101844> '
     }
     if (message.content.includes('**USSouth3**')) {
     tracked += '<@&465895643664351245> '
     }
     if (message.content.includes('**EUWest**')) {
     tracked += '<@&465895685154275338> '
     }
     if (message.content.includes('**USMidWest2**')) {
     tracked += '<@&465895737293537294> '
     }
     if (message.content.includes('**EUNorth**')) {
     tracked += '<@&465895790645346304> '
     }
     if (message.content.includes('**USEast**')) {
     tracked += '<@&465895853610237991> '
     }
     if (message.content.includes('**USSouthWest**')) {
     tracked += '<@&465895968961855488> '
     }
     if (message.content.includes('**AsiaEast**')) {
     tracked += '<@&465896024800624650> '
     }
     if (message.content.includes('**EUNorth2**')) {
     tracked += '<@&465896065846214676> '
     }
     if (message.content.includes('**EUWest2**')) {
     tracked += '<@&465896101426495499> '
     }
     if (message.content.includes('**USEast3**')) {
     tracked += '<@&465896146066210837> '
     }
     if (message.content.includes('**EUEast**')) {
     tracked += '<@&465896186331529216> '
     }
     if (message.content.includes('**AsiaSouthEast**')) {
     tracked += '<@&465896284629499904> '
     }
     if (message.content.includes('**EUSouthWest**')) {
     tracked += '<@&465896500048691203> '
     }
     if (message.content.includes('**EUSouth**')) {
     tracked += '<@&465896546412789761> '
     }
     if (message.content.includes('**USMidWest**')) {
     tracked += '<@&465896587428757504> '
     }
     if (message.content.includes('**USWest3**')) {
     tracked += '<@&465896638528094209> '
     }
     if (message.content.includes('**Australia**')) {
     tracked += '<@&465896691216941057> '
     }
     
     
     
     
     
     
    tracked += `\`[${moment().format("LT")}]\``
    client.channels.get('465894086168281109').send(tracked)
    }
        
    }

if (message.content.startsWith('**Parasite Chambers Portal**')) {
    client.channels.get('457270832364912670').send(`<@&457261792763052032> ${msg}`)
    return;
}
if (message.content.startsWith('**Tomb of the Ancients Portal**')) {
    client.channels.get('457270832364912670').send(`<@&457261671006863392> ${msg}`)
    return;
}
if (message.content.startsWith('**The Shatters**')) {
    client.channels.get('457270832364912670').send(`<@&457261732100833313> ${msg}`)
    return;
}
if (message.content.startsWith("**Davy Jones' Locker Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457261692750004254> ${msg}`)
    return;
}
if (message.content.startsWith("**Lair of Draconis Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457262219940593664> ${msg}`)
    return;
}
if (message.content.startsWith("**Ice Cave Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457262491232108544> ${msg}`)
    return;
}
if (message.content.startsWith("**Candyland Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457262549902295061> ${msg}`)
    return;
}
if (message.content.startsWith("**The Epic Hive Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457349360838115368> ${msg}`)
    return;
}
if (message.content.startsWith("**Deadwater Docks**")) {
    client.channels.get('457270832364912670').send(`<@&457349360838115368> ${msg}`)
    return;
}
if (message.content.startsWith("**The Crawling Depths**")) {
    client.channels.get('457270832364912670').send(`<@&457349360838115368> ${msg}`)
    return;
}
if (message.content.startsWith("**Woodland Labyrinth**")) {
    client.channels.get('457270832364912670').send(`<@&457349360838115368> ${msg}`)
    return;
}
if (message.content.startsWith("**Lost Halls Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457351150824325130> ${msg}`)
    return;
}
if (message.content.startsWith("**Ocean Trench Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457261828414767104> ${msg}`)
    return;
}
if (message.content.startsWith("**Puppet Encore Portal**")) {
    client.channels.get('457270832364912670').send(`<@&457264788712587264> ${msg}`)
    return;
}
if (message.channel.id == '457259123566706740') { client.channels.get('457270832364912670').send(`<@&457349779601752085> ${msg}`) }

});



client.login(process.env.BOT_TOKEN);
