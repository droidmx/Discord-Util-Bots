const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const snekfetch = require('snekfetch');
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
            user[msg.author.id] = { msgcount: 1, money: 0, daily: 0 }
        }
        else {
            user[msg.author.id].msgcount += 1
        }
    }
    if (!msg.content.startsWith(prefix)) {
        if (!user[msg.author.id]) {
            user[msg.author.id] = { msgcount: 1, money: 0, daily: 0 }
        }
        else {
            user[msg.author.id].msgcount += 1
        }
    }
    if (msg.content.startsWith(prefix + 'bal')) {
        var balmember = msg.mentions.members.first();
        var param = args[1]
        if (param == 'help') {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Balance Commands`,
                    description: `\`>>bal @member\`: Check the balance of another member!\n\`>>bal help\`: Shows this menu\n\`>>bal\`: Check your balance!`
                }
            })
            return;
        }
        if (!balmember) {
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
        if (!user[balmember.id]) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    description: `${balmember} was not found in the database!`
                }
            })
        }
        else {
            msg.channel.send({
                embed: {
                    color: 0x00FF00,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Current Balance for:`,
                    description: `${balmember}: $${user[balmember.id].money}!`
                }
            })
        }
    }
    if (msg.content.startsWith(prefix + 'pay')) {
        var paymember = msg.mentions.members.first();
        var amt = args[2]
        var payhelp = args[1]

        if (!payhelp) {
            msg.channel.send({
                embed: {
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Pay a User!`,
                    description: `\`>>pay @member x\`: Pays a user x dollars.\n**Be sure to replace @member with a valid user mention and x with a number!`
                }
            })
            return;
        }
        if (!paymember) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Incorrect Format`,
                    description: `Valid member not provided! Usage:\`>>bal @member amount\``
                }
            })
            return;
        }
        if (!amt) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Incorrect Format`,
                    description: `Valid amount not provided! Usage:\`>>bal @member amount\``
                }
            })
            return;
        }
        var amt = parseInt(amt)
        if (isNaN(amt)) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Incorrect Format`,
                    description: `Valid amount not provided! Usage:\`>>bal @member amount\``
                }
            })
            return;
        }
        if (amt > user[msg.author.id].money) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: `Oops!`,
                    description: `You do not have enough money!`
                }
            })
            return;
        }
        if (!user[balmember.id]) {
            user[balmember.id] = { msgcount: 1, money: 0, daily: 0 }
        }
        user[msg.author.id].money = user[msg.author.id] - amt
        user[balmember.id].money = user[balmember.id].money + amt
        msg.channel.send({
            embed: {
                color: 0x00FF00,
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarURL
                },
                title: `Success!`,
                description: `You have successfully payed $${amt} to ${balmember}!\n**Current Balance: $${user[msg.author.id].money}**`
            }
        })
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
                        name: '`>>income`',
                        value: "Collect your hourly income! Your income increases per hour the more you type!"
                    },
                    {
                        name: '`>>leaderboard`',
                        value: 'See the top 5 richest people!'
                    },
                    {
                        name: '`>>pay @member x`',
                        value: 'Pay another user x dollars!'
                    },
                    {
                        name: '`>>bal`',
                        value: "See your current balance! Mention a member after `>>bal` to see their balance!"
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


    if (msg.content.startsWith(prefix + 'income')) {
        if (new Date().getTime() - user[msg.author.id].daily > 3600000) {
            var income = 250 + user[msg.author.id].msgcount
            user[msg.author.id].money += 250 + user[msg.author.id].msgcount
            user[msg.author.id].daily = new Date().getTime()
            msg.channel.send({
                embed: {
                    color: 0x00FFFF,
                    author: {
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    title: "Hourly Income",
                    description: `You have recieved your hourly reward of $${income}`
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
                    description: "You have already recieved your daily reward! You can collect your next reward in " + Math.round(((3600000) - (new Date().getTime() - user[msg.author.id].daily)) / (60 * 1000), 2) + " minutes!"
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
        var rawdata = JSON.stringify(user)
      
        msg.author.send(`Testing message.`, {
  files: [
    "./user.json"
  ]
})
        
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
        var message = `**1)** <@${retrieval[sorting[0]]}> with $${sorting[0]}\n**2)** <@${retrieval[sorting[1]]}> with $${sorting[1]}\n**3)** <@${retrieval[sorting[2]]}> with $${sorting[2]}\n**4)** <@${retrieval[sorting[3]]}> with $${sorting[3]}\n**5)** <@${retrieval[sorting[4]]}> with $${sorting[4]}
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
