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

client.on('message', async msg => { // start message handler
    if (msg.author.id === client.user.id) return;
    let guildapi = "http://www.tiffit.net/RealmInfo/api/guild?g=Donquixote Pirates&fe"
    let guildstats = msg.guild.channels.find('name', 'guild-stats');
    if (!test['guildstats']) {
        const purgemessage = await guildstats.fetchMessages();
        guildstats.bulkDelete(purgemessage);
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
                        initiates += ', '
                    }
                    if (g.body.members[i].guild_rank == 'Member') {
                        members += g.body.members[i].name
                        members += ', '
                    }
                    if (g.body.members[i].guild_rank == 'Officer') {
                        officers += g.body.members[i].name
                        officers += ', '
                    }
                    if (g.body.members[i].guild_rank == 'Leader') {
                        leaders += g.body.members[i].name
                        leaders += ', '
                    }
                    if (g.body.members[i].guild_rank == 'Founder') {
                        founders += g.body.members[i].name
                        founders += ', '
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
    // end update functions
    if (msg.content.toLowerCase().startsWith('>verify')) {
        var argss = msg.content.split(" ");
        if (msg.member.roles.some(r => ["Verified"].includes(r.name))) {
            msg.author.send("You are already verified!")
            msg.delete();
            return;
        }
        msg.delete();
        let ruser = argss[1]
        if (!ruser) return msg.author.send('Please provide your username after `>verify`')
        let rcode = ("DP" + Math.floor(Math.random(11111) * 99999));
        if (!test[msg.author.id]) {
            test[msg.author.id] = { ign: `${ruser}`, code: `${rcode}` }
        }
        else {
            test[msg.author.id] = { ign: `${ruser}`, code: `${rcode}` }
        }

        let userdata = test[msg.author.id]

        msg.author.send({
            embed: {
                color: 0xa3fb7a,
                author: {
                    name: `Verification | ${ruser}`,
                    icon_url: msg.author.avatarURL
                },
                fields: [{
                        name: "**Your Code:**",
                        value: `**${userdata.code}**`,
                        inline: true,
                    },
                    {
                        name: "**Realmeye Link:**",
                        value: `https://www.realmeye.com/player/${userdata.ign}`,
                        inline: true,
                    },
                    {
                        name: `Place your verification code on any line of your description, but __*it **MUST** be the only piece of text on that line.*__`,
                        value: "Once you have placed the code, type `done` in <#458060339708428288>",
                    },
                ],
                footer: {
                    text: "⚠ Be sure to follow the directions above exactly, or your verification will fail",
                }
            }

        })
    }

    if (msg.content.toLowerCase().startsWith('done')) {

        if (msg.member.roles.some(r => ["Verified"].includes(r.name)))
            return;
        let userdatadone = test[msg.author.id]
        if (!userdatadone) {
            msg.author.send("Your IGN and Code was not found in the database, please go to #verify and type `>verify IGN`!")
            msg.delete()
            return;
        }
        msg.delete();
        console.log(userdatadone)
        let codexd = userdatadone.code
        let ignxd = userdatadone.ign
        let rrapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ignxd + "&f=c;"

        snekfetch.get(rrapi).then(r => {
            var rguild = r.body.guild
            var rguildrank = r.body.guild_rank
            var rname = r.body.name;
            var rdesc = r.body.description;
            if (!rdesc.includes(codexd))
                return msg.author.send("Your code was not found in any line of your description. Make sure that your code is the ONLY piece of text in one line of your description.")
            if (rdesc.includes(codexd))
                msg.guild.member(msg.author).setNickname(rname)
            let lelxdppebtw = msg.guild.roles.find("name", "Verified");

            msg.guild.member(msg.author).addRole(lelxdppebtw.id)
            if (rguild.includes("Donquixote Pirates")) {
                if (rguildrank == "Initiate") {
                    var guildrole = msg.guild.roles.find("name", "Guild Initiates")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send("It appears you are already in the guild! You have been given the appropriate role corresponding to your guild rank!")
                }
                if (rguildrank == "Member") {
                    var guildrole = msg.guild.roles.find("name", "Guild Members")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send("It appears you are already in the guild! You have been given the appropriate role corresponding to your guild rank!")
                }
                if (rguildrank == "Officer") {
                    var guildrole = msg.guild.roles.find("name", "Guild Officers")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send("It appears you are already in the guild! You have been given the appropriate role corresponding to your guild rank!")
                }
                if (rguildrank == "Leader") {
                    var guildrole = msg.guild.roles.find("name", "Guild Leaders")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send("It appears you are already in the guild! You have been given the appropriate role corresponding to your guild rank!")
                }
                if (rguildrank == "Founder") {
                    var guildrole = msg.guild.roles.find("name", "Guild Founders")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send("It appears you are already in the guild! You have been given the appropriate role corresponding to your guild rank!")
                }
            }
            else {
                console.log(`${msg.author.username} not in guild`);
                msg.author.send("You have successfully been verified, but it looks like you're not in the guild! <add application here>");
            }
        })
    }
    if (msg.content.toLowerCase().startsWith('>update')) {
        console.log(msg.guild.member(msg.author).nickname.toLowerCase())
        snekfetch.get("http://www.tiffit.net/RealmInfo/api/user?u=" + msg.guild.member(msg.author).nickname.toLowerCase() + "&f=c;").then(u => {
            if (!u.body.error) {
                var rguild = u.body.guild
                var rguildrank = u.body.guild_rank
                var rname = u.body.name;
                if (rguild.includes("Donquixote Pirates")) {
                if (rguildrank == "Initiate") {
                    var guildrole = msg.guild.roles.find("name", "Guild Initiates")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send(`Your account was successfully updated, your current guild rank is ${rguild}`)
                }
                if (rguildrank == "Member") {
                    var guildrole = msg.guild.roles.find("name", "Guild Members")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send(`Your account was successfully updated, your current guild rank is ${rguild}`)
                }
                if (rguildrank == "Officer") {
                    var guildrole = msg.guild.roles.find("name", "Guild Officers")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send(`Your account was successfully updated, your current guild rank is ${rguild}`)
                }
                if (rguildrank == "Leader") {
                    var guildrole = msg.guild.roles.find("name", "Guild Leaders")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send(`Your account was successfully updated, your current guild rank is ${rguild}`)
                }
                if (rguildrank == "Founder") {
                    var guildrole = msg.guild.roles.find("name", "Guild Founders")
                    msg.guild.member(msg.author).addRole(guildrole.id)
                    msg.author.send(`Your account was successfully updated, your current guild rank is ${rguild}`)
                }
            }
            else {
                console.log(`${msg.author.username} not in guild`);
                msg.author.send("Your account was successfully found, but it looks like you're not in the guild! <add application here>");
            }
            }else{
                msg.author.send('Either your realmeye guild data is hidden, or your username does not exist.')
            }
        })
    }
}); //end message handler





fs.writeFile('./test.json', JSON.stringify(test), console.error);
client.login(process.env.BOT_TOKEN)
