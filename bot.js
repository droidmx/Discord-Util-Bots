const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async msg => {
    if (msg.channel.id == '467445547557453837') {
	if (msg.author.id == '227937398997123073') {
		client.channels.get('492016165485281280').send(msg.content)	
	}
    }

});


//





// THIS  MUST  BE  THIS  WAY
client.login('NDg1MDcxMDIwMzk1NDYyNjU2.DoXyBQ.CeF2oVrYRJQTFvKgNOH41lGZX28');
