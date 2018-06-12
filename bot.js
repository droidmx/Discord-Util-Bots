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
      var array = ['455988206903623695', '455987104619692043', '454642295023861760', '454641313929887765', '449935593112207361', '454641489054531596', '454641257793454110', '454641426865586187', '449912619395055626', '449925590573645864', '449925525973237776', '449925551579332608', '455327899000504330'];
      console.log(message.guild.channels.size)
    for (i in array) {
        var specifics = client.channels.get(array[i])
        specifics.fetchMessages()
          .then(messages => {
            specifics.bulkDelete(messages);
            var messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.author.sendMessage("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
        
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
            message.author.send(`${err} \n Go talk to Droid`)
          });
    }
      console.log(array)
  }
    
    
    if (message.content === '!channels') {
    console.log(message.guild.channels)
}
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
