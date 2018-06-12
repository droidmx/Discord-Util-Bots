const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
client.on('message', message => {
    if (message.content === '!classpoll') {
        if (!message.member.roles.some(r => ["-=+|Founder|+=-", "-=+Head Admin+=-", "-=Mod=-"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");
    	client.channels.get('455987104619692043').send("@here A class poll has been initiated! You **MUST** react with the class that you are bringing to the run!").then(oldMessage => {
             
        oldMessage.react(message.guild.emojis.get('455989455254323202')) //huntress
        oldMessage.react(message.guild.emojis.get('455989990497976321')) //rogue
        oldMessage.react(message.guild.emojis.get('455990457378406400')) //archer
        oldMessage.react(message.guild.emojis.get('455990385831968779')) //wizard
        oldMessage.react(message.guild.emojis.get('455988769552859137')) // priest
        oldMessage.react(message.guild.emojis.get('455988788439678998')) //warior
        oldMessage.react(message.guild.emojis.get('455988391553662986')) // knight
        oldMessage.react(message.guild.emojis.get('455988748451315712'))  // paladin
        oldMessage.react(message.guild.emojis.get('455988702225629204')) // assassin
        oldMessage.react(message.guild.emojis.get('455990313820094465')) // necromancer
        oldMessage.react(message.guild.emojis.get('455988727018422282')) // mystic
        oldMessage.react(message.guild.emojis.get('455989499646705677')) // trickster
        oldMessage.react(message.guild.emojis.get('455988612144562178')) //sorcerer
        oldMessage.react(message.guild.emojis.get('455990161734369280')) // ninja
        
        
            
         })
 
  	}
  
  if (message.content === '!clearall') {
    if (!message.member.roles.some(r => ["-=+|Founder|+=-"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");
  
      console.log(message.guild.channels.size)
    message.guild.channels.array().forEach(channel =>{
        if (channel.parentID == '449924740958650368') return;
        channel.fetchMessages({
      limit: '9999'
    })
          .then(messages => {
            channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted
            
            // Logging the number of messages deleted on both the channel and console.
            message.author.sendMessage("Clear of <#" + channel.id + "> was successful . Total messages deleted: "+ messagesDeleted);
        
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
            message.author.send(`${err} \n Go talk to Droid`)
          });
    })
      
  }
    
    
    if (message.content === '!channels') {
    console.log(message.guild.channels)
}
    if (message.content == '!clearchannel') {

      // Check the following permissions before deleting messages:
      //    1. Check if the user has enough permissions
      //    2. Check if I have the permission to execute the command

      if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
        return;
      } else if (!message.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        console.log("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
        return;
      }

      // Only delete messages if the channel type is TextChannel
      // DO NOT delete messages in DM Channel or Group DM Channel
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.sendMessage("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
            console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
    }
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
