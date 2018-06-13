const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
let user = JSON.parse(fs.readFileSync('./user.json', 'utf8'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ game: { name: `casino games | >>help`, type: 0 } });
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
    let args = msg.content.split(' ');
    if (!msg.content.startsWith(prefix)) {
        if (!user[msg.author.id]) {
            user[msg.author.id] = { msgcount: 1, money: 0, daily: 'yes' }
        }
        else {
            user[msg.author.id].msgcount += 1
        }
    }
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
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Current Balance:`,
                    description: `$${user[msg.author.id].money}!`
                }
            })
        }
        else {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Current Balance:`,
                    description: `$${user[msg.author.id].money}!`
                }
            })
        }
    }
    if (msg.content == prefix + 'help') {
        msg.channel.send({
            embed: {
                color: 0xFFFFFF,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: `**Commands**`,
                description: `All commands on this bot are economy-related!`,
                fields: [{
                        name: '`>>help`',
                        value: "Shows this menu"
                    },
                    {
                        name: '`>>daily`',
                        value: "Collect your daily income!"
                    },
                    {
                        name: '`>>bal`',
                        value: "See your current balance!"
                    },
                    {
                        name: '`>>slots <number>`',
                        value: 'Take your chances to get some money!'
                    },
                    {
                        name: '`>>slots info`',
                        value: 'Get the odds on your outcome!'
                    }


                ]
            }
        })
    }

    if (msg.content.startsWith(prefix + 'daily')) {
        if (user[msg.author.id].daily != moment().format('L')) {
            user[msg.author.id].money += 50
            user[msg.author.id].daily = moment().format('L')
            msg.channel.send({
                embed: {
                    color: 0x00FFFF,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: "Daily Reward",
                    description: "You have recieved your daily reward of $50!"
                }
            })

        }
        else {
            msg.channel.send({
                embed: {
                    color: 0x00FFFF,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: "Daily Reward",
                    description: "You have already recieved your daily reward! You can collect your next reward " + moment().endOf('day').fromNow()
                }
            })
        }


    }
    if (msg.content.startsWith(prefix + 'slots')) {
        var bet = args[1]
        if (!bet) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: "You must specify an amount to bet.\nExample: `" + prefix + "slots 50`\n" +
                        "Use `" + prefix + "slots info` to receive a DM of the chances of winning."
                }
            });
            return;
        }
        if (bet == 'info') {
            msg.author.send({
                embed: {
                    color: 0x888888,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: "The following are the chances of possible outcomes\n\n" +
                        "**Loss: ** 65%\n" +
                        "**Double: ** 24%\n" +
                        "**Triple: ** 10.9%\n" +
                        "**Jackpot: ** 0.1%\n"
                }
            });
            return;
        }
        var bet = parseInt(bet)
        if (isNaN(bet)) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: "You must bet an amount!"
                }
            });
            return;
        }
        if (bet > user[msg.author.id].money) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: "You do not have that much money!\nCurrent balance: $" + user[msg.author.id].money
                }
            });
            return;
        }

        var emojis = ['<:rip:456349890016968705>', '<:fame:456347834908672030>', '<:knight:456342264600461312>', '<:omni:456348042782703616>']
        var border_top = "**==========**";
        var border_bottom = "**==========**";
        var possible_fails = [
            `${emojis[0]} ${emojis[1]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[1]}`,
            `${emojis[0]} ${emojis[3]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[3]} ${emojis[1]}`,

            `${emojis[1]} ${emojis[0]} ${emojis[2]}`,
            `${emojis[1]} ${emojis[0]} ${emojis[3]}`,
            `${emojis[1]} ${emojis[2]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[2]} ${emojis[3]}`,
            `${emojis[1]} ${emojis[3]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[3]} ${emojis[2]}`,

            `${emojis[2]} ${emojis[0]} ${emojis[3]}`,
            `${emojis[2]} ${emojis[0]} ${emojis[1]}`,
            `${emojis[2]} ${emojis[1]} ${emojis[0]}`,
            `${emojis[2]} ${emojis[1]} ${emojis[3]}`,
            `${emojis[2]} ${emojis[3]} ${emojis[0]}`,
            `${emojis[2]} ${emojis[3]} ${emojis[1]}`,

            `${emojis[0]} ${emojis[3]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[3]} ${emojis[1]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[1]}`
        ];
        var possible_doubles = [
            `${emojis[0]} ${emojis[0]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[0]} ${emojis[1]}`,
            `${emojis[0]} ${emojis[0]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[0]}`,
            `${emojis[0]} ${emojis[3]} ${emojis[0]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[0]}`,
            `${emojis[3]} ${emojis[0]} ${emojis[0]}`,
            `${emojis[2]} ${emojis[0]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[0]} ${emojis[0]}`,

            `${emojis[2]} ${emojis[2]} ${emojis[0]}`,
            `${emojis[2]} ${emojis[2]} ${emojis[1]}`,
            `${emojis[2]} ${emojis[2]} ${emojis[3]}`,
            `${emojis[2]} ${emojis[1]} ${emojis[2]}`,
            `${emojis[2]} ${emojis[0]} ${emojis[2]}`,
            `${emojis[2]} ${emojis[3]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[2]}`,
            `${emojis[1]} ${emojis[2]} ${emojis[2]}`,
            `${emojis[3]} ${emojis[2]} ${emojis[2]}`,

            `${emojis[0]} ${emojis[0]} ${emojis[3]}`,
            `${emojis[0]} ${emojis[0]} ${emojis[1]}`,
            `${emojis[0]} ${emojis[0]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[0]}`,
            `${emojis[0]} ${emojis[2]} ${emojis[0]}`,
            `${emojis[0]} ${emojis[3]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[0]} ${emojis[0]}`,
            `${emojis[2]} ${emojis[0]} ${emojis[0]}`,
            `${emojis[3]} ${emojis[0]} ${emojis[0]}`,

            `${emojis[1]} ${emojis[1]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[1]} ${emojis[3]}`,
            `${emojis[1]} ${emojis[1]} ${emojis[2]}`,
            `${emojis[1]} ${emojis[0]} ${emojis[1]}`,
            `${emojis[1]} ${emojis[2]} ${emojis[1]}`,
            `${emojis[1]} ${emojis[3]} ${emojis[1]}`,
            `${emojis[0]} ${emojis[1]} ${emojis[1]}`,
            `${emojis[2]} ${emojis[1]} ${emojis[1]}`,
            `${emojis[3]} ${emojis[1]} ${emojis[1]}`
        ];
        var possible_triple = [
            `${emojis[2]} ${emojis[2]} ${emojis[2]}`,
            `${emojis[0]} ${emojis[0]} ${emojis[0]}`,
            `${emojis[1]} ${emojis[1]} ${emojis[1]}`,
        ];
        var jackpot = `${emojis[3]} ${emojis[3]} ${emojis[3]}`;
        var message = ``;
        var roll = Math.random() * 100;
        if (roll <= 65) { // Failed
            message += "**You lost your bet of $" + bet + "**\nYour roll:\n\n";
            message += border_top + "\n";
            message += possible_fails[Math.floor(Math.random() * (possible_fails.length))] + "   <\n";
            message += border_bottom + "\n\n";
            user[msg.author.id].money = user[msg.author.id].money - bet
            message += "You have $" + user[msg.author.id].money + " left.";
            msg.channel.send({
                embed: {
                    color: 000000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: message
                }
            });
        }
        else if (roll > 99.9) {
            message += "**You Hit the Jackpot!! **\nYour roll:\n\n";
            message += border_top + "\n";
            message += jackpot + "   <\n";
            message += border_bottom + "\n\n";
            var rand_jackpot = Math.floor((Math.random() * 100) + 50);
            message += `You earned **$${bet*rand_jackpot}**!\n`;
            var winnings = bet * rand_jackpot
            user[msg.author.id].money = user[msg.author.id].money + winnings
            message += "Current balance: $" + user[msg.author.id].money;
            msg.channel.send({
                embed: {
                    color: 000000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: message
                }
            });

        }
        else if (roll > 89) {
            message += "**You Rolled a Triple!**\nYour roll:\n\n";
            message += border_top + "\n";
            message += possible_triple[Math.floor(Math.random() * (possible_triple.length))] + "   <\n";
            message += border_bottom + "\n\n";
            message += `You earned $${bet*2}!\n`;
            var winnings = bet * 2
            user[msg.author.id].money = user[msg.author.id].money + winnings
            message += "Current balance: $" + user[msg.author.id].money;
            msg.channel.send({
                embed: {
                    color: 000000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: message
                }
            });

        }
        else {
            message += "**You rolled a double!**\nYour roll:\n\n";
            message += border_top + "\n";
            message += possible_doubles[Math.floor(Math.random() * (possible_doubles.length))] + "   <\n";
            message += border_bottom + "\n\n";
            message += "You earned $" + bet + "!\n";
            user[msg.author.id].money = user[msg.author.id].money + bet
            message += "Current balance: $" + user[msg.author.id].money;
            msg.channel.send({
                embed: {
                    color: 000000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: message
                }
            });

        }
    }
    if (msg.content.startsWith(prefix + 'jsoninfo')) {
        if (msg.author.id != '368756694114893825') return;
        msg.channel.send(JSON.stringify(user))
    }
    if (msg.content.startsWith(prefix + 'leaderboard')) {
        var retrieval = {};
        var sorting = []

        for (var key in user) {
            if (user.hasOwnProperty(key)) {
                var value = user[key].money;
                retrieval[value] = key
                sorting.push(value)
            }

        }
        console.log(sorting)
        console.log(retrieval)
        sorting.sort((a, b) => b - a);
        var message = `
        **1)** <@${retrieval[sorting[0]]}> with $${sorting[0]}\n
        **2)** <@${retrieval[sorting[1]]}> with $${sorting[1]}\n
        **3)** <@${retrieval[sorting[2]]}> with $${sorting[2]}\n
        **4)** <@${retrieval[sorting[3]]}> with $${sorting[3]}\n
        **5)** <@${retrieval[sorting[4]]}> with $${sorting[4]}
        `
        
        msg.channel.send({
                embed: {
                    color: 000000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: "The Top 5 users are: ",
                    description: message
                }
            });
    }

}); //end message handler


fs.writeFile('./user.json', JSON.stringify(user), console.error);





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
