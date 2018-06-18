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
    if (msg.author.id === client.user.id) return;
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
            var worldrank = g.body.fame.rank
            var guildxp = g.body.xp.amount
            var guildxp = guildxp.toString()
            var xprank = g.body.xp.rank
            var activeserver = g.body.most_active.server
            var serverrank = g.body.most_active.rank
            var initiates = ''
            var members = ''
            var officers = ''
            var leaders = ''
            var founders = ''
            var i;
            for (i in g.body.members) {
                if (g.body.members[i].name == 'Private') {
                    continue;
                }
                if (g.body.members[i].guild_rank == 'Initiate') {
                    initiates += g.body.members[i].name
                    initiates += ' | '
                }
                if (g.body.members[i].guild_rank == 'Member') {
                    members += g.body.members[i].name
                    members += ' | '
                }
                if (g.body.members[i].guild_rank == 'Officer') {
                    officers += g.body.members[i].name
                    officers += ' | '
                }
                if (g.body.members[i].guild_rank == 'Leader') {
                    leaders += g.body.members[i].name
                    leaders += ' | '
                }
                if (g.body.members[i].guild_rank == 'Founder') {
                    founders += g.body.members[i].name
                    founders += ' | '
                }
            }
            var finalmessage = `
                **====================================**
                \n# of Members: **${membercount}** | # of Characters: **${characters}**
                \nGuild Fame: **${guildfame}** | World Rank: **${worldrank}**
                \nGuild XP: **${guildxp}** | XP Rank: **${xprank}**
                \nMain Server: **${activeserver}** | Server Rank: **${serverrank}**
                \n**====================================**
                `


        })
        const lol = guildstats.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Guild Stats for the Donquixote Pirates",
                url: "https://www.realmeye.com/guild/Donquixote%20Pirates",
                description: 'type another message in guild chat to update',
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Droid"
                }
            }
        })
        const logid = await lol
        test['guildstats'] = logid.id

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
                var guildxp = g.body.xp.amount
                var guildxp = guildxp.toString()
                var xprank = g.body.xp.rank
                var activeserver = g.body.most_active.server
                var serverrank = g.body.most_active.rank
                var initiates = ''
                var members = ''
                var officers = ''
                var leaders = ''
                var founders = ''
                var i;
                for (i in g.body.members) {
                    if (g.body.members[i].name == 'Private') {
                        continue;
                    }
                    if (g.body.members[i].guild_rank == 'Initiate') {
                        initiates += g.body.members[i].name
                        initiates += ' | '
                    }
                    if (g.body.members[i].guild_rank == 'Member') {
                        members += g.body.members[i].name
                        members += ' | '
                    }
                    if (g.body.members[i].guild_rank == 'Officer') {
                        officers += g.body.members[i].name
                        officers += ' | '
                    }
                    if (g.body.members[i].guild_rank == 'Leader') {
                        leaders += g.body.members[i].name
                        leaders += ' | '
                    }
                    if (g.body.members[i].guild_rank == 'Founder') {
                        founders += g.body.members[i].name
                        founders += ' | '
                    }
                }
                var finalmessage = `
                **====================================**
                \n# of Members: **${membercount}** | # of Characters: **${characters}**
                \nGuild Fame: **${guildfame}** | World Rank: **${worldrank}**
                \nGuild XP: **${guildxp}** | XP Rank: **${xprank}**
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
                        fields: [{
                                name: "Founder(s)",
                                value: founders,
                                inline: true
                            },
                            {
                                name: "Leaders",
                                value: leaders,
                                inline: true
                            },
                            {
                                name: "Officers",
                                value: officers,
                                inline: true
                            },
                            {
                                name: "Members",
                                value: members,
                                inline: true
                            },
                            {
                                name: "Initiates",
                                value: initiates
                            }
                        ],
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
