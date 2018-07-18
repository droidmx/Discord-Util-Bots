//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const setupCMD = "!createrolemessage"

let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;

const roles = ["Pub Halls", "Shatters", "Pub Shats", "SBC", "LHZ", "EDZ", "Lost Boys"];

const reactions = ["💻", "🖌", "😃", "🆕"];
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
client.on('message', async msg => {
if (msg.author.id == '368756694114893825') {
if (msg.content.includes('/add')) {
var args = msg.content.split(" ");
let guild = msg.guild;
    let toAdd = args[2];
    let title = args[1];

    if(!title || !toAdd) {
        return msg.channel.send('Please provide name and url for the emoji to add. Ex: >>addemoji <name> <url>');
    } else {
        guild.createEmoji(toAdd, title)
        .then(emoji => msg.react(emoji))
        .catch(console.log('Something went wrong.'));
      
    }
}
}
if (msg.channel.id == '467445547557453837') {
 client.channels.get('467436171664949249').send(msg.content)       
}
if (msg.channel.id == '469165806211825677') {
 client.channels.get('467421795490856960').send(msg.content)   
}
    if (msg.channel.id == '467532711960248321') {
 client.channels.get('461571905736933386').send(msg.content)   
}



   
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
