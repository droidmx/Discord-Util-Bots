const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");


client.on('message', function(message) {
  var args = message.content.split(" ");
  var cmd = args[0];

  args = args.splice(1);

       switch(cmd) {

case "!verify":
let ruser = args.slice(0).join("");
let rcode = ("DROID" + Math.floor(Math.random(11111) * 99999));
let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f=c;"


if(!ruser)
return message.author.send("Please include a username after !verify. Be sure that your IGN had no typos!")

message.delete();

message.author.send({embed: {
  color: 0xff040b,
  author: {
    name: `Verification | ${message.author.tag}`,
    icon_url: message.author.avatarURL
  },
  fields: [{
      name: "**Your Code:**",
      value: `__**${rcode}**__`,
      inline: true,
    },
    {
      name: "**Realmeye Link:**",
      value: `https://www.realmeye.com/player/${ruser}`,
      inline: true,
    },
    {
      name: `Place your verification code on any line of your Realmeye description, however, it  __**must replace everything else**__.`,
      value: `Your code must be the only text in one line of your Realmeye description.`,
    },
  ],
  footer: {
    text: "Once you have entered the code, type `!done` here!",
  }
}
});

.then(client.on('message', message => {
    if (message.content === '!done') {

snekfetch.get(rapi).then(r => {
  let rdesc = r.body.description;
  let rname = r.body.name
  let rstars = r.body.rank
  let rlocation = r.body.last_seen
  let rfame = r.body.fame

  if(!rdesc.includes(rcode))
  return message.author.send("Your code was not found in your Realmeye description. Be sure that the code is the ONLY text in one line of your description.")
  
  if(rstars < (30))
return message.author.send("You do not have enough stars to be verified! You have " + rstars + ". You need __**30**__.\nYour previous Realmeye description was:\n```" + brdesc + "```")
  
  if(!rlocation.includes("hidden"))
return message.author.send("Your location is not hidden so you cannot be verified!")
    
if(rfame < (250))
return message.author.send("Your do not have enough fame to be verified! You have " + rfame + ". You need __**250**__.")

  if(rdesc.includes(rcode))
  message.guild.member(message.author).setNickname(`${rname}`)
  message.guild.member(message.author).addRole("437853950033526785")
  message.author.send("You have successfully been verified!");
})
}}));
})
break;
           
case "!afkcheck":
    message.channel.send("@ here")
    message.channel.send({embed: {
        color: 0xff040b,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: "**An AFK-check has started!**",
        description: "React with 👍 to stay in the voice channel! You have 120 seconds to react and join the run!",
        // Once roles and emojis are set up, add codes to fields. Ask Dylan for embed source :D
        /*fields: [{
            name: "If you have a key, and are willing to pop, react with",
            value: `__**${rcode}**__`,
            inline: true,
        },
            {
            name: "**Realmeye Link:**",
            value: `https://www.realmeye.com/player/${ruser}`,
            inline: true,
        },
        {
            name: `Place your verification code on the __**first line**__ of your Realmeye description, __replacing everything else__.`,
            value: `Your original Realmeye description will be sent back shortly.`,
        }],*/
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
        }
    }
}).then(function (m) {
    m.react("👍").then(m => {
        setTimeout(() => {
            const ausers = m.reactions.get("👍").fetchUsers().then(ausers => {
                Users.foreach(aser => {
                    m.guild.fetchMember(auser).setVoiceChannel("437973965789462530")
                })
            })
        }, 10000)
    })
})
break;
           
case "!info":
message.delete();

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: "LHGS Utility Bot Info",
    icon_url: client.user.avatarURL
  },
  fields: [{
      name: "__**Version**__",
      value: "1.0.0",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "5/2/18",
      inline: true,
    },
    {
      name: "__**Information**__",
      value: "The LHGS Utility Bot was coded using JavaScript and has been functional since 5/2/18"
    },
    {
      name: "__**LHGS Invite**__",
      value: "Invite people to LHGS to run Lost Halls! : https://discord.gg/uF4S8p6"
    }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: "https://cdn.discordapp.com/avatars/160140367554019329/a423acbb3957e25bce788915eda9414a.png?size=2048",
    text: "~Droid~#5799"
  }
}
});
break;
           
case "!userinfo":

let uiembed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setDescription("This is " + message.author.username + "'s info!")
.setThumbnail(message.author.avatarURL)
.setColor("0xff040b")
.addField("Full Username:", `${message.author.username}#${message.author.discriminator}`)
.addField("User ID:", message.author.id)
.addField("Created At:", message.author.createdAt);

message.channel.sendEmbed(uiembed)
break;

case "!suggest":
let suggestion = args.slice(0).join(' ');

if (!suggestion)
return message.reply("Please include a suggestion for the bot!")

message.delete();
message.reply("Thank you for the suggestion!")
client.channels.get("441416698420265000").send({embed: {
    color: 0xff040b,
    author: {
      name: "New Suggestion!",
      icon_url: client.user.avatarURL,
    },
    title: "**Suggestion:**",
    description: suggestion,
    fields: [{
        name: "*Idea Sent in by:*",
        value: "" + message.author + "\n*Vote whether or not this is a good suggestion.*",
    }],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
})
.then(message=>{
    message.react("✅")
    message.react("❎")
  })
break;

  case "!rotmgchars":
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    thumbnail: {
      url: 'https://steamuserimages-a.akamaihd.net/ugc/615025248066186198/CCF7A2CA7AAC3180249A4C8E8346C0DA68A4D839/'
    },
    title: "**Realm Characters**",
    description: "These are all of the current Realm of the Mad God characters.",
    fields: [{
        name: "__**Rogue**__ : Uses a medium ranged dagger. Special ability is cloaking.",
        value: "\u200b"
      },
      {
        name: "__**Archer**__ : Uses a long ranged bow. Special ability is shooting debuffs.",
        value: "\u200b"
      },
      {
        name: "__**Wizard**__ : Uses a long ranged staff. Special ability is burst of damage within a range.",
        value: "\u200b"
      },
      {
        name: "__**Priest**__ : Uses a long ranged wand. Special ability is AoE healing.",
        value: "\u200b"
      },
      {
        name: "__**Warrior**__ : Uses a short ranged sword. Special ability is berserk mode.",
        value: "\u200b"
      },
      {
        name: "__**Knight**__ : Uses a short ranged sword. Special ability is shield bash.",
        value: "\u200b"
      },
      {
        name: "__**Paladin**__ : Uses a short ranged sword. Special ability is AoE buff.",
        value: "\u200b"
      },
      {
        name: "__**Assassin**__ : Uses a medium ranged dagger. Special ability is throwing poisons that damage over time.",
        value: "\u200b"
      },
      {
        name: "__**Necromancer**__ : Uses a long ranged staff. Special ability is lifesteal.",
        value: "\u200b"
      },
      {
        name: "__**Huntress**__ : Uses a long ranged bow. Special ability is placing damaging traps.",
        value: "\u200b"
      },
      {
        name: "__**Mystic**__ : Uses a long ranged staff. Special ability is stasising enemies.",
        value: "\u200b"
      },
      {
        name: "__**Trickster**__ : Uses a medium ranged dagger. Special ability is sending out decoys.",
        value: "\u200b"
      },
      {
        name: "__**Sorcerer**__ : Uses a long ranged wand. Special ability is damage dealt across enemies.",
        value: "\u200b"
      },
      {
        name: "__**Ninja**__ : Uses a medium ranged katana. Special ability is shooting damaging shuriken.",
        value: "\u200b"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
  break;
           
 case "!warn":
let members = message.mentions.members.first();

  if(!message.member.roles.some(r=>["Administrator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!members)
    return message.reply("Please mention a valid member of this server!");

  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the warn!");
  
  message.channel.send(`***✅ ${members.user.tag} has been warned.***`);
  client.channels.get("437973965789462530").send({embed: {
    color: 0xff040b,
    author: {
      name: `Warn | ${members.user.tag} `,
      icon_url: members.user.avatarURL
    },
    fields: [{
        name: "User",
        value: `${members.user}`,
        inline: true,
      },
      {
        name: "Moderator",
        value: `${message.author}`,
        inline: true,
      },
      {
        name: "Reason",
        value: `${reason}`,
        inline: true,
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `ID: ${members.user.id}`,
    }
  }
});
  message.mentions.users.first().send(`You were warned in LH Group System, ${reason}`);
break;
           
case "!kick":
if(!message.member.roles.some(r=>["Administrator", "Moderator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();

    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

      let kreason = args.slice(1).join(" ");
    if(!kreason)
      return message.reply("Please indicate a reason for the kick!");

      let kkreason = args.slice(1).join(' ');
      member.kick(kreason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      client.channels.get("437973965789462530").send({embed: {
        color: 0xff040b,
        author: {
          name: `Ban | ${member.user.tag} `,
          icon_url: member.user.avatarURL
        },
        fields: [{
            name: "User",
            value: `${member.user}`,
            inline: true,
          },
          {
            name: "Moderator",
            value: `${message.author}`,
            inline: true,
          },
          {
            name: "Reason",
            value: `${kreason}`,
            inline: true,
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `ID: ${member.user.id}`,
        }
      }
    });
    message.channel.send(`***${member.user.tag} was kicked.***`);
break;

case "!ban":
let bmember = message.mentions.members.first();

  if(!message.member.roles.some(r=>["Administrator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
  
  if(!bmember)
    return message.reply("Please mention a valid member of this server");
  if(!bmember.bannable) 
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let breason = args.slice(1).join(' ');
  if(!breason)
    return message.reply("Please indicate a reason for the ban!");
  
  bmember.ban(breason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    client.channels.get("437973965789462530").send({embed: {
      color: 0xff040b,
      author: {
        name: `Ban | ${bmember.user.tag} `,
        icon_url: bmember.user.avatarURL
      },
      fields: [{
          name: "User",
          value: `${bmember.user}`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${message.author}`,
          inline: true,
        },
        {
          name: "Reason",
          value: `${breason}`,
          inline: true,
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `ID: ${bmember.user.id}`,
      }
    }
  });
  message.channel.send(`***✅ ${bmember.user.tag} was banned!***`);
break;
           
           
  case "!commands":
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
    },
    thumbnail: {
      url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
    },
    title: "__**Commands**__",
    fields: [{
        name: "`!rotmgchars`",
        value: "This command shows all existing characters in ROTMG"
      },
      {
        name: "`!commands`",
        value: "This command displays all available commands."
      },
      {
        name: "`!suggest`",
        value: "This command will send your suggestions for the bot."
      },
      {
        name: "`!info`",
        value: "Shows details about the bot!"
      },
      {
        name: "`!userinfo`",
        value: "This command will display your Discord account information."
      }
    ],
    footer: {
      text: "If you have any question, feel free to pm Droid!"
    }
  }
});
break;
           
  case "!staffcommands":
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
    },
    thumbnail: {
      url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
    },
    title: "__**Staff Commands**__",
    fields: [{
        name: "`!warn <@user> <reason>`",
        value: "Warns a user of an infraction, be sure to include reason."
      },
      {
        name: "`!kick <@user> <reason>`",
        value: "Kicks a user from the server."
      },
      {
        name: "`!ban <@user> <reason>`",
        value: "Bans user from the server."
      },
      {
        name: "`!suspend <@user> <time: h, d, w> <reason>`",
        value: "Suspendsa user from participating in runs for a set amount of time. (Not functional as ofnow)"
      },
             { 
               name: "`!afkcheck`",
               value: "Starts an AFK Check. Use in raid status. Work in progress"
             }
    ],
    footer: {
      text: "Use these commands only when necessary"
    }
  }
});
break;
       }
});


client.login(process.env.BOT_TOKEN);
