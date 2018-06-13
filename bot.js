const Discord = require('discord.js');
const client = new Discord.Client();
let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

client.on('ready', () => {
    console.log('I am ready!');
});

const prefix = '>>'
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
client.on('message', async message => {
   if (!message.content.startsWith(prefix)) {
       
   }
});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
