
const Discord = require("discord.js")
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require("fs");
const ms = require("ms");
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
let raid = JSON.parse(fs.readFileSync('./raid.json', 'utf8'));
const music = require('discord.js-musicbot-addon');

music.start(client, { //start music bot
  youtubeKey: "AIzaSyAAKSiOkapv22Kt3OWNOAWeTcXJ0yLmJ90",
  prefix: "-",
  helpCmd: "mhelp",
  thumbnailType: "high",
  maxQueueSize: "10",
  enableQueueStat: true,
  anyoneCanAdjust: true,
  anyoneCanLeave: true,
  ownerOverMember: true,
  clearOnLeave: true,
  botOwner: "368756694114893825"
}); //end music bot



var lmaoxd;

client.on('raw', event => {
if (event.t == 'VOICE_STATE_UPDATE') {
var voiceguild = client.guilds.get(event.d.guild_id)

var voicechannel = client.channels.get(event.d.channel_id)

var voicemember = voiceguild.members.get(event.d.user_id)

if (raid['queuemove'] == 'yes' && voicechannel.id == voiceguild.channels.find('name', 'Queue').id) {
voicemember.setVoiceChannel(voiceguild.channels.find('name', 'Raiding').id)
}

}

})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    game: {
      name: `in the Realm`,
      type: 0
    }
  })
  client.user.setStatus('dnd');
});
const prefix = '-'
client.on('message', async msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;
  let args = msg.content.split(" ");
  if (msg.content.toLowerCase().startsWith(prefix + 'verify')) { //START VERIFY CMD
    let verifchannel = msg.guild.channels.find("name", "verify")
    if (msg.channel.id != verifchannel.id) {
      return;
    }
    msg.delete();
    if (msg.member.roles.some(r => ["Raider"].includes(r.name))) {
      msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:deny:459474016324026398> You are already verified!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    let ruser = args[1]
    if (!ruser) {
      msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:deny:459474016324026398> You did not provide a IGN to check!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    if (ruser == 'IGN') {
      msg.author.send({
        embed: {
          color: 0xFFB400,
          description: ":warning: Follow the directions carefully! You are supposed to replace 'IGN' with your RotMG Username. Please try again.",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    let rcode = ("RR" + Math.floor(Math.random(11111) * 99999));
    let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f="
    test[msg.author.id] = {
      ign: `${ruser}`,
      code: `${rcode}`
    }
    let userdata = test[msg.author.id]
    var verifmsg = `:vibration_mode: Your verification code is **__${rcode}__** and the IGN you provided is **__${ruser}__**\n
\nOnce you have confirmed that you have provided the correct RotMG Username, paste your code **anywhere** in your RealmEye description. Then, type \`-done\` in <#450356452427825154> to finish.`
    msg.author.send({
      embed: {
        color: 0x42017E,
        author: {
          name: "Realm Raiders Verification",
          icon_url: msg.author.avatarURL
        },
        description: verifmsg,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    console.log(test)
  } //END VERIFY CMD
  if (msg.content.toLowerCase().startsWith('-done')) { //START DONE CMD
    let verifchannel = msg.guild.channels.find("name", "verify")

    if (msg.channel.id != verifchannel.id) {
      return;
    }

    if (msg.member.roles.some(r => ["Raider"].includes(r.name))) {
      msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:deny:459474016324026398> You are already verified!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      msg.delete();
      return;
    }
    let userdatadone = test[msg.author.id]
    if (!userdatadone) {
      msg.author.send({
        embed: {
          color: 0xFFB400,
          description: ":warning: Your IGN and Code were not found in the database, please go to <#450356452427825154> and type `-verify IGN` first.",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      msg.delete()
      return;
    }
    msg.delete();
    console.log(userdatadone)
    let ccodexd = userdatadone.code
    let ignxd = userdatadone.ign
    let rrapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ignxd + "&f="
    snekfetch.get(rrapi).then(r => {
      let rdesc = r.body.description;
      let rname = r.body.name
      let rstars = r.body.rank
      let rlocation = r.body.last_seen
      let rfame = r.body.fame
      let points = 0
      let chars = r.body.characters
      if (r.body.error == "No User Found!") return msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:deny:459474016324026398> Your Realmeye Profile was not found. Either you have provided an incorrect IGN, or your realmeye profile is hidden!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      if (!chars[0].stats_maxed) {
        msg.author.send({
          embed: {
            color: 0xFFB400,
            description: ":warning: Your characters are hidden, you cannot be verified until they are visible!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        return;
      }
      var i;
      for (i in chars) {
        if (chars[i].stats_maxed == '2/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '3/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '4/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '5/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '6/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '7/8') {
          points += 10
        }
        if (chars[i].stats_maxed == '8/8') {
          points += 10
        }
      }
      if (!rdesc.join('').includes(ccodexd))
        return msg.author.send({
          embed: {
            color: 0xFFB400,
            description: ":warning: Your code was not found in any line of your description. Please wait 30 seconds before trying again! \n\n:exclamation: Tip: Refresh your Realmeye page 3 times to ensure the code is in the description!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
      if (!points >= 10)
        return msg.author.send({
          embed: {
            color: 0xFFB400,
            description: ":warning: You do not have a character with 2 or more stats maxed, therefore you do not meet requirements. If you wish to appeal about your case, please PM an Admin+",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
      if (!rlocation.includes("hidden"))
        return msg.author.send({
          embed: {
            color: 0xFF0000,
            description: "<:deny:459474016324026398> Your location is not hidden, you cannot be verified until your last-seen location is hidden!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })

      if (rfame < (500))
        return msg.author.send({
          embed: {
            color: 0xFFB400,
            description: ":warning: You do not have 500 alive fame, therefore you do not meet requirements. If you wish to appeal about your case, please PM an Admin+",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
      if (rdesc.join('').includes(ccodexd)) {
        msg.guild.member(msg.author).setNickname(`${rname}.`)
        msg.guild.member(msg.author).addRole(msg.guild.roles.find('name', 'Raider'));
        msg.author.send({
          embed: {
            color: 0x3BF601,
            description: "<:approve:459473995453038612> You have successfully been verified!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        });
        msg.guild.channels.find("name", "bot-logs").send({
          embed: {
            color: 0xfb7ae4,
            author: {
              name: `User Verified | ${ignxd}`,
              icon_url: msg.author.avatarURL
            },
            fields: [{
                name: "**Realmeye Link:**",
                value: `https://www.realmeye.com/player/${ignxd}`,
                inline: true,
              },
              {
                name: "__**User IGN**__",
                value: ignxd,
                inline: true,
              },
              {
                name: "__**Character Fame**__",
                value: rfame + " Fame",
                inline: true,
              },
              {
                name: "__**Stars**__",
                value: rstars + " Stars",
                inline: true,
              }
            ],
            footer: {
              text: "User has been verified by the bot.",
            }
          }
        });
      }
    })

  } //END DONE CMD
  if (msg.content.toLowerCase().startsWith('-afk')) { //START AFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Droid's Dominion"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'raid-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> Command used in wrong channel",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var afktype = args[1]
    var wrongmsg = "```diff\n+ tomb\n+ ot\n+ lod\n+ pupe\n+ cland\n+ parasite\n+ davy\n+ temple\n+ cdepth\n+ woodlab\n+ icecave\n+ nest\n+ shaitan\n+ various\n+ event\n```"
    if (!afktype) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Incorrect AFK-Type Provided! Here is a list of accepted dungeon types!" + wrongmsg,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.content.includes('tomb')) { //START TOMB
      raid['dungeontype'] = 'Tomb of the Ancients'
      raid['portal'] = '<:tomb:437861607926792193>'
      raid['key'] = '<:tombkey:451382023853178881>'
      raid['color'] = 16445973

      const afkid = await msg.guild.channels.find('name', 'raid-status').send('@here', {
        embed: {
          color: 16445973,
          author: {
            name: "Realm Raiders",
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg"
          },
          title: `**${msg.author.username} has started an AFK-Check for a __Tomb of the Ancients__!**`,
          description: "React with <:tomb:437861607926792193> and join queue to ensure you are in the next run! The AFK-Check will end when the Raid Leader has finished preparations! \nIn addition to reacting with <:tomb:437861607926792193>,",

          fields: [{
              name: "If you have a key, and are willing to pop",
              value: "react with <:tombkey:451382023853178881>",

            },
            {
              name: "If you have a Priest you are willing to bring",
              value: "react with <:priest:450369875467173890>",

            },
            {
              name: "If you have a Paladin you are willing to bring",
              value: "react with <:paladin:450369854231412766>",

            },
            {
              name: "If you have a Warrior you are willing to bring",
              value: "react with <:warrior:450369890721857596>",

            },
            {
              name: "If you have a Rogue you are willing to bring",
              value: "react with <:rogue:451510300727050242>",

            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
      await afkid.react('437861607926792193') // portal
      await afkid.react('451382023853178881') //key
      await afkid.react('450369875467173890')
      await afkid.react('450369854231412766')
      await afkid.react('450369890721857596')
      await afkid.react('451510300727050242')
      raid['afkid'] = afkid.id
      console.log(raid['afkid'])
    } // END TOMB
    if (msg.content.includes('ot')) { //START OT
      raid['dungeontype'] = 'Ocean Trench'
      raid['portal'] = '<:ot:450387617981136907>'
      raid['key'] = '<:otkey:450387638080372746>'
      raid['color'] = 0165255
      const afkid = await msg.guild.channels.find('name', 'raid-status').send('@here', {
        embed: {
          color: 0165255,
          author: {
            name: "Realm Raiders",
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg"
          },
          title: `**${msg.author.username} has started an AFK-Check for an __Ocean Trench__!**`,
          description: "React with <:ot:450387617981136907> and join queue to ensure you are in the next run! The AFK-Check will end when the Raid Leader has finished preparations! \nIn addition to reacting with <:ot:450387617981136907>,",

          fields: [{
              name: "If you have a key, and are willing to pop",
              value: "react with <:otkey:450387638080372746>",

            },
            {
              name: "If you have a Priest you are willing to bring",
              value: "react with <:priest:450369875467173890>",

            },
            {
              name: "If you have a Paladin you are willing to bring",
              value: "react with <:paladin:450369854231412766>",

            },
            {
              name: "If you have a Warrior you are willing to bring",
              value: "react with <:warrior:450369890721857596>",

            },
            {
              name: "If you have a Rogue you are willing to bring",
              value: "react with <:rogue:451510300727050242>",

            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
      await afkid.react('450387617981136907') // portal
      await afkid.react('450387638080372746') //key
      await afkid.react('450369875467173890')
      await afkid.react('450369854231412766')
      await afkid.react('450369890721857596')
      await afkid.react('451510300727050242')
      raid['afkid'] = afkid.id
      console.log(raid['afkid'])
    } // END OT
    if (msg.content.includes('lod')) { //START lod
      raid['dungeontype'] = 'Lair of Draconis'
      raid['portal'] = '<:lod:450387701037006851>'
      raid['key'] = '<:lodkey:450387684033298432>'
      raid['color'] = 7125551
      const afkid = await msg.guild.channels.find('name', 'raid-status').send('@ here', {
        embed: {
          color: raid['color'],
          
          title: `**${msg.author.username} has started an AFK-Check for an __${raid['dungeontype']}__!**`,
          description: `React with ${raid['portal']} and join queue to ensure you are in the next run! The AFK-Check will end when the Raid Leader has finished preparations! \nIn addition to reacting with ${raid['portal']},`,

          fields: [{
              name: "If you have a key, and are willing to pop",
              value: `react with ${raid['key']}`,

            },
            {
              name: "If you have a Priest you are willing to bring",
              value: "react with <:priest:450369875467173890>",

            },
            {
              name: "If you have a Paladin you are willing to bring",
              value: "react with <:paladin:450369854231412766>",

            },
            {
              name: "If you have a Warrior you are willing to bring",
              value: "react with <:warrior:450369890721857596>",

            },
            {
              name: "If you have a Rogue you are willing to bring",
              value: "react with <:rogue:451510300727050242>",

            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
      await afkid.react('450387701037006851') // portal
      await afkid.react('450387684033298432') //key
      await afkid.react('450369875467173890')
      await afkid.react('450369854231412766')
      await afkid.react('450369890721857596')
      await afkid.react('451510300727050242')
      raid['afkid'] = afkid.id
      console.log(raid['afkid'])
    } // END LOD
    if (msg.content.includes('pupe')) { //START puppet encore
      raid['dungeontype'] = 'Puppet Master\'s Encore'//
      raid['portal'] = '<:pupe:461005744335224854>'
      raid['key'] = '<:pupekey:461014524036775937>'
      raid['color'] = 7125551
      const afkid = await msg.guild.channels.find('name', 'raid-status').send('@here', {
        embed: {
          color: raid['color'],
          
          title: `**${msg.author.username} has started an AFK-Check for a __${raid['dungeontype']}__!**`,
          description: `React with ${raid['portal']} and join queue to ensure you are in the next run! The AFK-Check will end when the Raid Leader has finished preparations! \nIn addition to reacting with ${raid['portal']},`,

          fields: [{
              name: "If you have a key, and are willing to pop",
              value: `react with ${raid['key']}`,

            },
            {
              name: "If you have a Priest you are willing to bring",
              value: "react with <:priest:450369875467173890>",

            },
            {
              name: "If you have a Paladin you are willing to bring",
              value: "react with <:paladin:450369854231412766>",

            },
            {
              name: "If you have a Warrior you are willing to bring",
              value: "react with <:warrior:450369890721857596>",

            },
            {
              name: "If you have a Rogue you are willing to bring",
              value: "react with <:rogue:451510300727050242>",

            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
      await afkid.react('461005744335224854') // portal
      await afkid.react('461014524036775937') //key
      await afkid.react('450369875467173890')
      await afkid.react('450369854231412766')
      await afkid.react('450369890721857596')
      await afkid.react('451510300727050242')
      raid['afkid'] = afkid.id
      console.log(raid['afkid'])
    } // END puppet encore
   



  } // END AFK COMMAND
  if (msg.content.toLowerCase().startsWith('-endafk')) { //START ENDAFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Droid's Dominion"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'raid-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> Command used in wrong channel",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!raid['afkid'] || raid['afkid'] == 0) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: There is no active AFK-Check!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'raid-status').fetchMessage(`${raid['afkid']}`).then(mesg => {
      var keys = mesg.reactions.map(m => m.users.map(u => u.username).join(', ')) //.map(m => m.users.map(u => u.username));

      var priests = mesg.reactions.find(reaction => reaction.emoji.id === '450369875467173890').count - 1
      var paladins = mesg.reactions.find(reaction => reaction.emoji.id === '450369854231412766').count - 1
      var warriors = mesg.reactions.find(reaction => reaction.emoji.id === '450369890721857596').count - 1
      var rogues = mesg.reactions.find(reaction => reaction.emoji.id === '451510300727050242').count - 1

      var reactions = mesg.reactions.map(m => m.users.map(u => u.id));
      var allusers = [];
      var promises = [];
      var queuepromise = client.channels.get('437782399175098368').members.array()
      var raidingpromise = client.channels.get('440014722587426816').members.array()
      var afkpromise = client.channels.get('438553677322518530').members.array()
      var i;
      for (i in queuepromise) {
        allusers.push(queuepromise[i].id)
      }
      for (i in raidingpromise) {
        allusers.push(raidingpromise[i].id)
      }
      for (i in afkpromise) {
        allusers.push(afkpromise[i].id)
      }
      for (i in allusers) {
        var user = msg.guild.members.get(allusers[i])
        if (reactions[0].includes(allusers[i])) {
          promises.push(user.setVoiceChannel('440014722587426816'))
        } else {
          promises.push(user.setVoiceChannel('438553677322518530'))
        }
      }
      mesg.edit({
        embed: {
          color: raid['color'],
          
          title: `${msg.author.username} has ended the AFK-Check for the __${raid['dungeontype']}__`,
          description: `If you have been moved to the Raiding VC, please wait for further instructions. The run has not started yet, so if you wish to participate, join the 'queue' voice channel!
          \n ${raid['portal']} Raiders: **${reactions[0].length - 1}**
          \n ${raid['key']} Key Holders: **${keys[1].slice(7)}**
          \n <:priest:450369875467173890> Priests: **${priests}**
          \n <:paladin:450369854231412766> Paladins: **${paladins}**
          \n <:warrior:450369890721857596> Warriors: **${warriors}**
          \n <:rogue:451510300727050242> Rogues: **${rogues}**`,
          timestamp: new Date(),
         footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
    })
    raid['queuemove'] = 'yes'
    
  } //END ENDAFK CMD
  
  
if (msg.content.toLowerCase().startsWith('-startrun')) {
if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Droid's Dominion"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'raid-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> Command used in wrong channel",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
raid['queuemove'] = 'no'
 msg.guild.channels.find('name', 'raid-status').fetchMessage(`${raid['afkid']}`).then(mesg => {
 mesg.edit({
        embed: {
          color: raid['color'],
          
          title: `${msg.author.username} has started the run for the __${raid['dungeontype']}__`,
          description: `The raid is currently **in session**. Please wait for the run to end and for another AFK-Check to be initiated!`,
          timestamp: new Date(),
         footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
 });

}
if (msg.content.toLowerCase().startsWith('-endrun')) {
if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Droid's Dominion"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'raid-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> Command used in wrong channel",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
msg.guild.channels.find('name', 'raid-status').fetchMessage(`${raid['afkid']}`).then(mesg => {
 mesg.edit({
        embed: {
          color: raid['color'],
          
          title: `The run for the __${raid['dungeontype']}__ has ended`,
          description: `The raid is currently **finished**. If you participated in the run, please provide feedback for ${msg.author.username} in <#460993740375457802>`,
          timestamp: new Date(),
         footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
 });
 raid['afkid'] = 0
}


  if (msg.content.toLowerCase().startsWith('-abortafk')) { //START ABORTAFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Droid's Dominion"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'raid-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> Command used in wrong channel",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!raid['afkid'] || raid['afkid'] == 0) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: There is no active AFK-Check!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'raid-status').fetchMessage(`${raid['afkid']}`).then(mesg => {
      mesg.edit({
        embed: {
          color: 0xFF0000,
          
          title: `${msg.author.username} has aborted the AFK-Check for the __${raid['dungeontype']}__`,
          description: `Please wait for further instructions from a Leader`,
          timestamp: new Date(),
          footer: {
            icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
            text: "Realm Raiders | © Droid & Co."
          }
        }
      })
    });
    raid['afkid'] = 0
    raid['queuemove'] = 'no'
  } //END ABORTAFK CMD

  if (msg.content.toLowerCase().startsWith('-warn')) { //START WARN CMD
    if (!msg.member.roles.some(r => ["Admin", "Moderator", "Security", "Raid Leader", "Trial Raid Leader"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var warnmemb = msg.mentions.members.first();
    var warnmsg = args.splice(1).slice(1).join(' ');
    if (!warnmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to warn!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!warnmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the warn!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    warnmemb.send({
      embed: {
        color: 0xFFB400,
        description: `You have been **warned** in Realm Raiders by ${msg.author}! \n\n**Reason:** ${warnmsg} \n\n:joystick: To continue using our server, please abide by our rules in the future to avoid more punishment.\n\n<:signquestionicon:459473621304213525> Questions about your warning? Please message an administrator **privately** to dispute it.`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${warnmemb} was successfully warned!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0xFFB400,
        description: `${warnmemb} was **warned**! \n\n**Reason:** ${warnmsg}\n\n**Warned by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })

  } //END WARN CMD


  if (msg.content.toLowerCase().startsWith('-kick')) { //START KICK CMD
    if (!msg.member.roles.some(r => ["Owner", "Admin", "Moderator", "Security"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var kickmemb = msg.mentions.members.first();
    var kickmsg = args.splice(1).slice(1).join(' ');
    if (!kickmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to kick!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!kickmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the kick!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!kickmemb.kickable) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> This member is not kickable!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    kickmemb.send({
      embed: {
        color: 0xFFB400,
        description: `You have been **kicked** from Realm Raiders by ${msg.author}! \n\n**Reason:** ${kickmsg} \n\n:joystick: To continue using our server, please abide by our rules in the future to avoid more punishment. You will also have to re-verify.\n\n<:signquestionicon:459473621304213525> Questions about your kick? Please message an administrator **privately** to dispute it.`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })

    kickmemb.kick(kickmsg).catch(error => msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: `<:deny:459474016324026398> An error ocurred. Err Msg: ${error}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    }))
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${kickmemb} was successfully kicked!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0xFF0000,
        description: `${kickmemb} was **kicked**! \n\n**Reason:** ${kickmsg}\n\n**Kicked by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })


  } // END KICK CMD
  if (msg.content.toLowerCase().startsWith('-ban')) { //START BAN CMD
    if (!msg.member.roles.some(r => ["Owner", "Admin"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var banmemb = msg.mentions.members.first();
    var banmsg = args.splice(1).slice(1).join(' ');
    if (!banmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please mention a valid member to ban!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!banmsg) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: ":warning: Please provide a reason for the ban!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!banmemb.bannable) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:deny:459474016324026398> This member is not bannable!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    banmemb.send({
      embed: {
        color: 0xFFB400,
        description: `You have been **banned** from Realm Raiders by ${msg.author}! \n\n**Reason:** ${banmsg} \n\n<:signquestionicon:459473621304213525> Questions about your ban? Please message an administrator **privately** to dispute it.`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })

    banmemb.ban(banmsg).catch(error => msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: `<:deny:459474016324026398> An error ocurred. Err Msg: ${error}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    }))
    msg.channel.send({
      embed: {
        color: 0x3BF601,
        description: `<:approve:459473995453038612> ${banmemb} was successfully banned!`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0x000000,
        description: `${banmemb} was **banned**! \n\n**Reason:** ${banmsg}\n\n**Banned by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })


  } // END BAN CMD
   if(msg.content.startsWith('!launch')){
   if (msg.author.id != '368756694114893825') return;
   
        console.log('command received');
        let members = msg.guild.members.array();
        
        members.forEach((member) => {
            console.log(member.id);
            
            member.send({
      embed: {
        color: 0x42017E,
        author: {
          name: "Realm Raiders Relaunch!",
          icon_url: msg.author.avatarURL
        },
        description: `**Hello ${msg.author}!** \nFor a while now, Realm Raiders has been dead. However, it has slowly been developed and re-purposed for an ALL-Dungeon server! Some of the dungeons we will run include Tombs, Ocean Trenches, Encores, and so many more! Now what we need is for YOU to start participating! Join in on our runs, and if you're up for the task, apply for a Raid Leader position! 
        
       \n **What do I do now?**
       \nGET VERIFIED! Go to <#450356452427825154> and follow the instructions to verify. *Even if you were previously verified, you still need to re-verify! Everyone's Raider Role has been stripped!*
       \nPARTICIPATE IN RUNS! Once you are verified, watch for AFK-Checks for different dungeons. If you have any keys you're willing to pop, let a Raid Leader know!
       \nINVITE YOUR FRIENDS! The more, the merrier! Here is the permanent invite link: https://discord.gg/GKe3m4p
       \n\nAfter all of that, you're officially a part of the Realm Raiders Community. We hope you enjoy your time here at REALM RAIDERS!
       \n~Droid`,
        timestamp: new Date(),
        footer: {
          icon_url: "https://images-ext-1.discordapp.net/external/UAf1vBtvUL2JClSAI8VmtD4b1l8kkGOyjOGKUDuOZq0/https/cdn.discordapp.com/icons/437778420496072717/19d9d5719c366366a30fa56ef9ef547f.jpg",
          text: "Realm Raiders | © Droid & Co."
        }
      }//
    })
            
                      
        })
                       
    }



}); // END MESSAGE HANDLER

fs.writeFile('./test.json', JSON.stringify(test), console.error);
fs.writeFile('./raid.json', JSON.stringify(test), console.error);
client.login(process.env.TOKEN)
