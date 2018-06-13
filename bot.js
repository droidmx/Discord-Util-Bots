const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
let user = JSON.parse(fs.readFileSync('./user.json', 'utf8'));

client.on('ready', () => {
    console.log('I am ready!');
});

const prefix = '>>'

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
client.on('message', async msg => { //start message handler
    if (!msg.content.startsWith(prefix)) {
        if (!user[msg.author.id]) {
            user[msg.author.id] = { msgcount: 1, money: 0, daily: 'yes' }
        }
        else {
            user[msg.author.id].msgcount += 1
        }
    }
    if (msg.content.startsWith(prefix + 'bal')) {
        if (!user[msg.author.id]) {
            user[msg.author.id] = { msgcount: 1, money: 0 }
            msg.channel.send({
                embed: {
                    title: "Current Balance",
                    description: `You have $${user[msg.author.id].money}!`
                }
            })
        }
        else {
            msg.channel.send({
                embed: {
                    title: "Current Balance",
                    description: `You have $${user[msg.author.id].money}!`
                }
            })
        }
    }
    if (msg.content.startsWith(prefix + 'daily')) {
        if (user[msg.author.id].daily != moment().format('L')) {
            user[msg.author.id].money += 50
            msg.channel.send({
                embed: {
                    title: "Daily Reward",
                    description: "You have recieved your daily reward of $50!"
                }
            })
            user[msg.author.id].daily = moment().format('L')
        }else{
            msg.channel.send({
                embed: {
                    title: "Daily Reward",
                    description: "You have already collected your daily reward! You can collect your next daily reward " + moment().endOf('day').fromNow()
                }
            })
        }
    }

}); //end message handler


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
