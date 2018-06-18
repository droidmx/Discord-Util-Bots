const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
const ms = require('ms');
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

client.on('message', async msg => {
if(msg.author.id === client.user.id) return;
    let guildapi = "http://www.tiffit.net/RealmInfo/api/guild?g=Donquixote Pirates&fe"
    let guildstats = msg.guild.channels.find('name', 'guild-stats');
    if (!test['guildstats']) {
        const purgemessage = await guildstats.fetchMessages();
        guildstats.bulkDelete(purgemessage);
        snekfetch.get(guildapi).then(g => {
            var guildname = g.body.name
            var membercount = g.body.memberCount
            var membercount = membercount.toString()
            var characters = g.body.characters
            var characters = characters.toString()
            var guildfame = g.body.fame.amount
            var guildfame = guildfame.toString()
            var worldrank = g.body.fame.rank
            var activeserver = g.body.most_active.server
            var serverrank = g.body.most_active.rank
            var finalmessage = `
                **====================================**
                \nGuild Information for **${guildname}**
                \n# of Members: **${membercount}** | # of Characters: **${characters}**
                \nGuild Fame: **${guildfame}** | World Rank: **${worldrank}**
                \nMain Server: **${activeserver}** | Server Rank: **${serverrank}**
                \n**====================================**
                `
            guildstats.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "Guild Stats for the Donquixote Pirates",
                    url: "https://www.realmeye.com/guild/Donquixote%20Pirates",
                    description: finalmessage,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Droid"
                    }
                }
            })
        })
    }
    else {
        guildstats.fetchMessage(test['guildstats']).then(guildstatsmessage => {
            snekfetch.get(guildapi).then(g => {
                var guildname = g.body.name
                var membercount = g.body.memberCount
                var membercount = membercount.toString()
                var characters = g.body.characters
                var characters = characters.toString()
                var guildfame = g.body.fame.amount
                var guildfame = guildfame.toString()
                var worldrank = g.body.fame.rank
                var activeserver = g.body.most_active.server
                var serverrank = g.body.most_active.rank
                var finalmessage = `
                **====================================**
                \nGuild Information for **${guildname}**
                \n# of Members: **${membercount}** | # of Characters: **${characters}**
                \nGuild Fame: **${guildfame}** | World Rank: **${worldrank}**
                \nMain Server: **${activeserver}** | Server Rank: **${serverrank}**
                \n**====================================**
                `
                guildstatsmessage.edit({
                    embed: {
                        color: 3447003,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        title: "Guild Stats for the Donquixote Pirates",
                        url: "https://www.realmeye.com/guild/Donquixote%20Pirates",
                        description: finalmessage,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Droid"
                        }
                    }
                })

            })
        })
    }
})

fs.writeFile('./test.json', JSON.stringify(test), console.error);
client.login(process.env.BOT_TOKEN)
 
