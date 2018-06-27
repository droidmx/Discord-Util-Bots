
const Discord = require("discord.js")
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require("fs");
const ms = require("ms");
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
let raid = JSON.parse(fs.readFileSync('./raid.json', 'utf8'));



var lmaoxd;
client.on('guildMemberAdd', member => {
    
    
member.user.send({
        embed: {
            color: 0x00FFFF,
            author: {
                name: `The Bridge Guardian`,
                icon_url: client.user.avatarURL
            },
            fields: [{
                    name: "Welcome to ***Shatters Central***!",
                    value: "To get started, read <#433789483222040577>! Once you have fully read the rules, go to <#433792597962522624> and follow the instructions to get verified!",
                    
                }
               
            ],
            footer: {
                text: "Bot coded by ~Droid~#5799, be sure to check <#433856093148676108> for other cool discords!",
            },
            thumbnail: {
                url: "https://cdn.discordapp.com/icons/433784235443355648/b5de61dee0b1deafb66f952791215f1c.jpg"
            }
        }
    });
        
    client.channels.get("451179074593751040").send({
        embed: {
            color: 0x00FFFF,
            author: {
                name: `New User | ${member.user.tag}`,
                icon_url: member.user.avatarURL
            },
            fields: [{
                    name: "__**Username:**__",
                    value: `${member.user}`,
                    inline: true,
                },
                {
                    name: "__**Account Created:**__",
                    value: `${member.user.createdAt}`,
                    inline: true,
                }
            ],
            footer: {
                text: "~Droid~#5799",
            }
        }
    });
});
 /*client.on('raw', event => {
if (event.t == 'VOICE_STATE_UPDATE') {
var voiceguild = client.guilds.get(event.d.guild_id)

var voicechannel = client.channels.get(event.d.channel_id)

var voicemember = voiceguild.members.get(event.d.user_id)

if (raid['queuemove'] == 'yes' && voicechannel.id == voiceguild.channels.find('name', 'Queue').id) {
voicemember.setVoiceChannel(voiceguild.channels.find('name', 'Raiding').id)
}

}

}) */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    game: {
      name: `Realm of the Mad God`,
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
    if (msg.member.roles.some(r => ["Shatters"].includes(r.name))) {
      msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:error:459473621233041428> You are already verified!",
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
          description: "<:error:459473621233041428> You did not provide a IGN to check!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    if (ruser.toLowerCase() == 'ign') {
      msg.author.send({
        embed: {
          color: 0xFFB400,
          description: "<:warn:459473619613908994> Follow the directions carefully! You are supposed to replace 'IGN' with your RotMG Username. Please try again.",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    let rcode = ("SC" + Math.floor(Math.random(11111) * 99999));
    let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f="
    test[msg.author.id] = {
      ign: `${ruser}`,
      code: `${rcode}`
    }
    let userdata = test[msg.author.id]
    var verifmsg = `:vibration_mode: Your verification code is **__${rcode}__** and the IGN you provided is **__${ruser}__**\n
\nOnce you have confirmed that you have provided the correct RotMG Username, paste your code **anywhere** in your RealmEye description. Then, type \`-done\` in <#433792597962522624> to finish.`
    msg.author.send({
      embed: {
        color: 0x42017E,
        author: {
          name: "Shatters Central Verification",
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

    if (msg.member.roles.some(r => ["Shatters"].includes(r.name))) {
      msg.author.send({
        embed: {
          color: 0xFF0000,
          description: "<:error:459473621233041428> You are already verified!",
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
          description: "<:warn:459473619613908994> Your IGN and Code were not found in the database, please go to <#433792597962522624> and type `-verify IGN` first. Be sure to replace IGN with you RotMG Username!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      msg.delete(100)
      return;
    }
    msg.delete(100);
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
          description: "<:error:459473621233041428> Your Realmeye Profile was not found. Either you have provided an incorrect IGN, or your realmeye profile is hidden!",
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
            description: "<:warn:459473619613908994> Your characters are hidden, you cannot be verified until they are visible!",
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
            description: "<:warn:459473619613908994> Your code was not found in any line of your description. Please wait 30 seconds before trying again! \n\n:exclamation: Tip: Refresh your Realmeye page 3 times to ensure the code is in the description!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        if (rstars < 25) return msg.author.send({
          embed: {
            color: 0xFFB400,
            description: "<:warn:459473619613908994> You do not have 13 stars or more, therefore you do not meet requirements. If you wish to appeal about your case, please PM an Admin+",
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
            description: "<:warn:459473619613908994> You do not have a character with 2 or more stats maxed, therefore you do not meet requirements. If you wish to appeal about your case, please PM an Admin+",
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
            description: "<:error:459473621233041428> Your location is not hidden, you cannot be verified until your last-seen location is hidden!",
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
            description: "<:warn:459473619613908994> You do not have 500 alive fame, therefore you do not meet requirements. If you wish to appeal about your case, please PM an Admin+",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
      if (rdesc.join('').includes(ccodexd)) {
        msg.guild.member(msg.author).setNickname(`${rname}.`)
        msg.guild.member(msg.author).addRole(msg.guild.roles.find('name', 'Shatters'));
        msg.author.send({
          embed: {
            color: 0x3BF601,
            description: "<:check:459473621031583765> You have successfully been verified!",
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
            name: "**User**",
            value: `${msg.author}`,
            inline: true,
            },
            
            {
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
  if (msg.content.toLowerCase().startsWith('-hc')) {
  if (!msg.member.roles.some(r => ["Raid Leader", "Almost Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
  
  const headcount = await msg.guild.channels.find('name', 'raid-status').send('@here A Headcount has been started! React with <:portal:433791162411646988> if you wish to start a shatters run, and <:shatterskey:460200528039903242> if you have a key and are willing to pop!')
  
  await headcount.react('433791162411646988')
  await headcount.react('460200528039903242')
  
  
  
  }
    
  if (msg.content.toLowerCase().startsWith('-afkcheck')) { //START AFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Almost Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    
  
      
      raid['portal'] = '<:portal:433791162411646988>'
      raid['key'] = '<:shatterskey:460200528039903242>'
      

      const afkid = await msg.guild.channels.find('name', 'raid-status').send('@here', {
        embed: {
          color: 0x006400,
          author: {
            name: "Shatters Central",
            icon_url: "https://static.drips.pw/rotmg/wiki/Environment/Portals/The%20Shatters.png"
          },
          title: `**${msg.author.username} has started an AFK-Check for a __Shatters__ run!**`,
          description: "React with <:portal:433791162411646988> and join queue to ensure you are in the next run! The AFK-Check will end when the Raid Leader has finished preparations! \nIn addition to reacting with <:portal:433791162411646988>,",

          fields: [{
              name: "If you have a key, and are willing to pop",
              value: "react with <:shatterskey:460200528039903242>",

            },
            {
              name: "If you have a Priest you are willing to bring",
              value: "react with <:priest:460200880138878996>",

            },
            {
              name: "If you have a Paladin you are willing to bring",
              value: "react with <:paladin:460200880046735361>",

            },
            {
              name: "If you have a Warrior you are willing to bring",
              value: "react with <:warrior:460200880172433428>",

            },
            {
              name: "If you have a Rogue you are willing to bring",
              value: "react with <:rogue:461235735287169029>",

            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Shatters Central | © Droid & Co."
          }
        }
      })
      await afkid.react('433791162411646988') // portal
      await afkid.react('460200528039903242') //key
      await afkid.react('460200880138878996')
      await afkid.react('460200880046735361')
      await afkid.react('460200880172433428')
      await afkid.react('461235735287169029')
      raid['afkid'] = afkid.id
      console.log(raid['afkid'])
   
   



  } // END AFK COMMAND
  if (msg.content.toLowerCase().startsWith('-endafk')) { //START ENDAFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
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
        description: "<:warn:459473619613908994> There is no active AFK-Check!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.guild.channels.find('name', 'raid-status').fetchMessage(`${raid['afkid']}`).then(mesg => {
      var keys = mesg.reactions.map(m => m.users.map(u => u.username).join(', ')) //.map(m => m.users.map(u => u.username));

      var priests = mesg.reactions.find(reaction => reaction.emoji.id === '460200880138878996').count - 1
      var paladins = mesg.reactions.find(reaction => reaction.emoji.id === '460200880046735361').count - 1
      var warriors = mesg.reactions.find(reaction => reaction.emoji.id === '460200880172433428').count - 1
      var rogues = mesg.reactions.find(reaction => reaction.emoji.id === '461235735287169029').count - 1

      var reactions = mesg.reactions.map(m => m.users.map(u => u.id));
      var allusers = [];
      var promises = [];
      var queuepromise = client.channels.get('433784986072776714').members.array()
      var raidingpromise = client.channels.get('433788028264120326').members.array()
      var afkpromise = client.channels.get('433803796339097610').members.array()
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
          promises.push(user.setVoiceChannel('433788028264120326'))
        } else {
          promises.push(user.setVoiceChannel('433803796339097610'))
        }
      }
      mesg.edit({
        embed: {
          color: 0x006400,
          
          title: `${msg.author.username} has ended the AFK-Check for the __Shatters__ run`,
          description: `If you have been moved to the Raiding VC, please wait for further instructions. The run has not started yet, so if you wish to participate, join the 'queue' voice channel!
          \n <:portal:433791162411646988> Raiders: **${reactions[0].length - 1}**
          \n <:shatterskey:460200528039903242> Key Holders: **${keys[1].slice(17)}**
          \n <:priest:460200880138878996> Priests: **${priests}**
          \n <:paladin:460200880046735361> Paladins: **${paladins}**
          \n <:warrior:460200880172433428> Warriors: **${warriors}**
          \n <:rogue:461235735287169029> Rogues: **${rogues}**`,
          timestamp: new Date(),
         footer: {
            icon_url: client.user.avatarURL,
            text: "Shatters Central | © Droid & Co."
          }
        }
      })
    })
    raid['queuemove'] = 'yes'
    
  } //END ENDAFK CMD
  
  
if (msg.content.toLowerCase().startsWith('-startrun')) {
if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
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
          color: 0x006400,
          
          title: `${msg.author.username} has started the run for the __Shatters__`,
          description: `The raid is currently **in session**. Please wait for the run to end and for another AFK-Check to be initiated!`,
          timestamp: new Date(),
         footer: {
            icon_url: client.user.avatarURL,
            text: "Shatters Central | © Droid & Co."
          }
        }
      })
 });

}
if (msg.content.toLowerCase().startsWith('-endrun')) {
if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
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
          color: 0x006400,
          
          title: `The run for the __Shatters__ has ended`,
          description: `The raid is currently **finished**. If you participated in the run, please provide feedback for ${msg.author.username} in <#433803620647960586>`,
          timestamp: new Date(),
         footer: {
            icon_url: client.user.avatarURL,
            text: "Shatters Central | © Droid & Co."
          }
        }
      })
 });
 var people = client.channels.get('433788028264120326').members.array();

                var promises = [];
                people.forEach(person => {
                    promises.push(person.setVoiceChannel('433784986072776714'));
                });
Promise.all(promises);
 raid['afkid'] = 0
}


  if (msg.content.toLowerCase().startsWith('-abortafk')) { //START ABORTAFK CMD
    if (!msg.member.roles.some(r => ["Raid Leader", "Trial Raid Leader", "Head Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (msg.channel.name != 'leader-bot-commands') return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> Command used in wrong channel. Correct Channel: <#437466234473283584>",
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
        description: "<:warn:459473619613908994> There is no active AFK-Check!",
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
          
          title: `${msg.author.username} has aborted the AFK-Check for the __Shatters__ run`,
          description: `Please wait for further instructions from a Leader`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Shatters Central | © Droid & Co."
          }
        }
      })
    });
    raid['afkid'] = 0
    raid['queuemove'] = 'no'
  } //END ABORTAFK CMD
  if (msg.content.toLowerCase().startsWith('-suspend')) {//START SUSPEND CMD
  if (!msg.member.roles.some(r => ["Owner", "Admin", "Officer", "Raid Leader", "Almost Raid Leader", "Chat Mod"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var suspenmemb = msg.mentions.members.first();
    var suspendreason = args.slice(3).join(' ')
    var timeframe = args[2]
     if (!suspenmemb) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: "<:warn:459473619613908994> Please mention a valid member to suspend!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!timeframe) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: "<:warn:459473619613908994> Please provide a time for the suspension!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    if (!suspendreason) return msg.channel.send({
      embed: {
        color: 0xFFB400,
        description: "<:warn:459473619613908994> Please provide a reason for the warn!",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    var membrole = msg.guild.roles.find("name", "Shatters");
    var suspenrole = msg.guild.roles.find("name", "Suspended")
    suspenmemb.addRole(suspenrole.id)
    suspenmemb.removeRole(membrole.id)
    raid[suspenmemb.id] = ms(timeframe)
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0xFFB400,
        description: `${suspenmemb} was **suspended** for **${ms(ms(timeframe), {long: true})}**! \n\n**Reason:** ${suspendreason}\n\n**Suspended by** ${msg.author}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    setTimeout(function(){
    suspenmemb.removeRole(suspenrole.id)
    suspenmemb.addRole(membrole.id)
    msg.guild.channels.find('name', 'punish-logs').send({
      embed: {
        color: 0x3BF601,
        description: `${suspenmemb} has been un-suspended! \n\n**Time of Suspension:** ${ms(ms(timeframe), {long: true})}`,
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    }, ms(timeframe));
    
  
  }// END SUSPEND CMD
  
  if (msg.content.toLowerCase().startsWith('-movequeue')) {
  if (!msg.member.roles.some(r => ["Raid Leader", "Almost Raid Leader", "rl-tag"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Droid & Co."
        }
      }
    })
    msg.react('👍')
    msg.channel.send('Moving Queue!')
    var people = client.channels.get('433784986072776714').members.array();

                var promises = [];
                people.forEach(person => {
                    promises.push(person.setVoiceChannel('433788028264120326'));
                });
Promise.all(promises);
  }
  
  
  if (msg.content.toLowerCase().startsWith('-warn')) { //START WARN CMD
    if (!msg.member.roles.some(r => ["Owner", "Admin", "Officer", "Raid Leader", "Almost Raid Leader", "Chat Mod"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
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
        description: "<:warn:459473619613908994> Please mention a valid member to warn!",
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
        description: "<:warn:459473619613908994> Please provide a reason for the warn!",
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
        description: `You have been **warned** in Shatters Central by ${msg.author}! \n\n**Reason:** ${warnmsg} \n\n:joystick: To continue using our server, please abide by our rules in the future to avoid more punishment.\n\n<:signquestionicon:459473621304213525> Questions about your warning? Please message an administrator **privately** to dispute it.`,
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
        description: `<:check:459473621031583765> ${warnmemb} was successfully warned!`,
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
    if (!msg.member.roles.some(r => ["Owner", "Admin", "Officer"].includes(r.name))) return msg.channel.send({
      embed: {
        color: 0xFF0000,
        description: "<:error:459473621233041428> You do not have permission to use this command",
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
        description: "<:warn:459473619613908994> Please mention a valid member to kick!",
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
        description: "<:warn:459473619613908994> Please provide a reason for the kick!",
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
        description: "<:error:459473621233041428> This member is not kickable!",
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
        description: `You have been **kicked** from Shatters Central by ${msg.author}! \n\n**Reason:** ${kickmsg} \n\n:joystick: To continue using our server, please abide by our rules in the future to avoid more punishment. You will also have to re-verify.\n\n<:signquestionicon:459473621304213525> Questions about your kick? Please message an administrator **privately** to dispute it.`,
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
        description: `<:error:459473621233041428> An error ocurred. Err Msg: ${error}`,
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
        description: `<:check:459473621031583765> ${kickmemb} was successfully kicked!`,
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
        description: "<:error:459473621233041428> You do not have permission to use this command",
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
        description: "<:warn:459473619613908994> Please mention a valid member to ban!",
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
        description: "<:warn:459473619613908994> Please provide a reason for the ban!",
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
        description: "<:error:459473621233041428> This member is not bannable!",
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
        description: `You have been **banned** from Shatters Central by ${msg.author}! \n\n**Reason:** ${banmsg} \n\n<:signquestionicon:459473621304213525> Questions about your ban? Please message an administrator **privately** to dispute it.`,
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
        description: `<:error:459473621233041428> An error ocurred. Err Msg: ${error}`,
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
        description: `<:check:459473621031583765> ${banmemb} was successfully banned!`,
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
   


}); // END MESSAGE HANDLER

fs.writeFile('./test.json', JSON.stringify(test), console.error);
fs.writeFile('./raid.json', JSON.stringify(test), console.error);
client.login(process.env.BOT_TOKEN)
