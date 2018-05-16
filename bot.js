const Discord = require('discord.js');
const client = new Discord.Client();
const yourID = "368756694114893825"; 
const setupCMD = "!createrolemessage"
let initialMessage = `"**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**"`
const roles = ["Town", "Park", "Bar"];
const reactions = ["🏙", "🏞", "🍹"];


//Load up the bot...

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `after hours | >>help`, type: 0 }});
});

const prefix = ">>"

const answers = [
  'Without a doubt', 'Extremely likely', 'Perhaps', 'Maybe', 'I\'ll have to think about that', 'Not a chance!'
]

client.on('message', msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;
let args = msg.content.split(" ").slice(1);
  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging... :signal_strength:").then(sent => {
      sent.edit(`:ping_pong: Pong! | Time Taken: ${sent.createdTimestamp - msg.createdTimestamp}ms`)
    })
  }

  if (msg.content.startsWith(prefix + '8ball')) {
  let args = msg.content.split(" ").slice(1);
  let question = args[0]
  if (!msg.content.endsWith('?')) {
    return msg.channel.send('You must ask me a question first!')
} else {
  msg.channel.send(`:8ball: | ${answers[Math.floor(Math.random() * answers.length)]}`);
  }
}
  
  if (msg.content.startsWith(prefix + "serverinfo")) {
    const embed = new Discord.RichEmbed()

    .setTitle(`${msg.guild.name}`)
    .setColor(0x17bec6)
    .addField(`Owner`, `${msg.guild.owner.user.tag} (${msg.guild.owner.id})`)
    .addField(`Members`, `${msg.guild.memberCount}`)
    .addField(`Region`, `${msg.guild.region}`)
    .addField(`ID`, `${msg.guild.id}`)
    .addField(`Channels`, `${msg.guild.channels.size}`)
    .addField(`Created at`, `Created at date: WIP`)

    msg.channel.send({embed});
}
  
  if (msg.content.startsWith(prefix + 'help')) {
  msg.channel.send(":inbox_tray: | Listed below are some commands")
  msg.channel.send(`\`\`\`asciidoc
= General =
>>ping :: Hm. I wonder what this does? /sarcasm
>>8ball :: Ask the magic 8ball a question. Pretty self explanatory
>>help :: Brings up this menu
>>invite :: Shows After Hours' Invite URL\`\`\``)
  msg.channel.send(`\`\`\`asciidoc
= Moderation =
>>ban :: Bans the user specified
>>kick :: Kicks the user specified
>>softban :: Softbans the specified user\`\`\``)
  }

  

  if (msg.content.startsWith(prefix + 'ban')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

  if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

  if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't ban yourself").catch(console.error);

  if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to ban me, ${msg.author.username}`).catch(console.error);

  userToBan.ban()
    var user = msg.mentions.users.first()
    const embed = new Discord.RichEmbed()
    .setTitle(`:hammer: User Banned: ${user.tag} (${user.id})`)
    .setColor(0xd11212)
    .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
    .setTimestamp(new Date(msg.createdTimestamp))

    msg.guild.channels.find("name", "👑mod-logs").send({embed});
  }

  if (msg.content.startsWith(prefix + 'kick')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("KICK_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

    if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

    if (!msg.guild.member(userToKick).kickable) return msg.channel.send("I can't kick that member!")

    if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't kick yourself");

    if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to kick me, ${msg.author.username}`).catch(console.error);

  userToKick.kick()
    var user = msg.mentions.users.first()
    const embed = new Discord.RichEmbed()
    .setTitle(`:hammer: User Kicked: ${user.tag} (${user.id})`)
    .setColor(0xf9a411)
    .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
    .setTimestamp(new Date(msg.createdTimestamp))

    msg.guild.channels.find("name", "👑mod-logs").send({embed});
  }

  
if (msg.content.startsWith(prefix + 'info')) {
  client.channel.send("Bot coded by Droid")
}
  
  
 if (msg.content.startsWith(prefix + 'softban')) {
   var reason = msg.content.split(' ').slice(2).join(' ');
   if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
   if (!msg.guild.member(client.user).permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

     if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

     if (!msg.guild.member(userToSB).bannable) return msg.channel.send("I can't softban that member!").catch(console.error);

     if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't softban yourself").catch(console.error);

     if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to softban me, ${msg.author.username}`).catch(console.error);

   userToSB.ban().then(member => {msg.guild.unban(member.user.id)});
     var user = msg.mentions.users.first()
     const embed = new Discord.RichEmbed()
     .setTitle(`:hammer: User Softbanned: ${user.tag} (${user.id})`)
     .setColor(0xfffa00)
     .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
     .setTimestamp(new Date(msg.createdTimestamp))

     msg.guild.channels.find("name", "👑mod-logs").send({embed});
  }

});
 
//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
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



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
