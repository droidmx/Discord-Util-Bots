
const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const prefix = '!';
const ownerid =  "368756694114893825"
const music = require('discord.js-musicbot-addon');
const snekfetch = require("snekfetch");

music(client, {
  prefix: "!",
  maxQueueSize: "100",
  disableLoop: true,
  leaveHelp: "Leaves the channel.",
  leaveAlt: ["lve","leev","un1c0rns"],
  helpCmd: 'mhelp',
  leaveCmd: 'leave',
  ownerOverMember: true,
  botOwner: '368756694114893825',
  youtubeKey: 'AIzaSyCGPHuK7cKaWyJ-_eUDjQGE-jvbkCa7aCw'
});

client.on('guildMemberAdd', member => {
  
client.channels.get("437973965789462530").send({embed: {
    color: 0xff040b,
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

client.on('message', function(message) {
  var args = message.content.split(" ");
  var cmd = args[0];

  args = args.splice(1);

       switch(cmd) {

        case "!mute":
        var ehh = message.guild.roles.find("name", "Muted");
        var pp = message.mentions.members.first();
        let mreason = args.slice(1).join(" ");
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (pp.roles.has(ehh.id)) {
                message.channel.send("That person is already muted!");
            } else {
                pp.addRole(ehh.id);
                pp.send("**You have been muted in " + message.guild + " for:**  `` " + mreason + "``");
                message.channel.send(message.guild.member(pp) + " **has been successfully muted!**");
            }
        } else {
            message.channel.send("You do not have the permission to use that command!");
            
            if (pp == null) {
              message.channel.send("You need to provide someone to kick!");
              }
        }
        break;

    case "!unmute":
        var eh = message.guild.roles.find("name", "Muted");
        var ppp = message.mentions.members.first();
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (ppp.roles.has(eh.id)) {
                ppp.removeRole(eh.id);
                ppp.send("**You have been unmuted in " + message.guild + "**");
                message.channel.send(message.guild.member(ppp) + " **has been successfully unmuted!**");
            } else {
                message.channel.send("That person is not muted!");
            }
        } else {
            message.channel.send("You do not have the permission to do that!")
        }
        break;

case "!update":
message.delete();

if(!message.member.roles.some(r=>["Administrator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
message.delete();

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: "Bot Update",
    icon_url: client.user.avatarURL
  },
  fields: [{
      name: "__**Version**__",
      value: "1.0.0",
      inline: true,
    },
    {
      name: "__**Release Date**__",
      value: "4/3/18",
      inline: true,
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

case "!startafk":
message.channel.send("@ here AFK Check! Join queue and react with 👌 to be moved in!")
.then(function (m) {
    m.react("👍")
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
      value: "LHGS Utility was coded using JavaScript in the begining of May, 2018"
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



case "!rdesc":
let rduser = args.slice(0).join("");
let rdapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + rduser + "&f=c;"

snekfetch.get(rdapi).then(h => {
  let brddesc = h.body.description;

  message.channel.send(brddesc);
})
break;

case "!verify":
let ruser = args.slice(0).join("");
let rcode = ("CH" + Math.floor(Math.random(11111) * 99999));
let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f=c;"

snekfetch.get(rapi).then(h => {
  let brdesc = h.body.description;

if(!ruser)
return message.author.send("Please include a username after !verify! Any typos will cause your verification process to fail.")

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
      name: `Place your code in the __**first line**__ of your Realmeye description, replacing everything else.`,
      value: `Your original Realmeye description will be sent back shortly.`,
    },
  ],
  footer: {
    text: "*The bot will check in 90 seconds to see if you followed directions.*",
  }
}
});

setTimeout(function(){ 

snekfetch.get(rapi).then(r => {
  let rdesc = r.body.description;
  let rname = r.body.name

  if(!rdesc.includes(rcode))
  return message.author.send("Your code was not found in the first line of your Realmeye description. Your previous Realmeye description was:\n```" + brdesc + "```")

  if(rdesc.includes(rcode))
  message.guild.member(message.author).setNickname(`${rname}`)
  message.guild.member(message.author).addRole("437853950033526785")
  message.author.send("You have successfully been verified!\nYour previous Realmeye description was:\n```" + brdesc + "```");
})
}, 60000);
})
break;

case "!find":
let users = client.users;
let searchTerm = args[0];

if(!searchTerm) 
return message.channel.send("Please provide a name to search for!")

let matches = users.filter(u => u.tag.toLowerCase().includes(searchTerm.toLowerCase()))
let foundppl = matches.map(users => users.tag)

if(!foundppl)
return message.channel.send("There is nobody that matches that username!")

message.channel.send(foundppl);
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
  description: "React with 👍 to stay in the voice channel! You have 120 seconds to react!",
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
  }
}
})
.then(function (m) {
  m.react("👍")
  
  .then(m => {
  setTimeout(() => {
  const ausers = m.reactions.get("👍").fetchUsers
  .then(ausers => {
      Users.foreach(aser => {
          Msg.guild.fetchmember(auser).setVoiceChannel("441417309169385482")
        }, 120000
)
  })
})
})
})
break;

case "!purge":
let messagenumber = args.slice(0).join(' ');

if(!message.member.roles.some(r=>["Administrator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
return message.reply ("You do not have the required permissions to use this!")

if(!messagenumber)
return message.reply("**Please include a number of messages to delete! (1-99)**\nExample: ``!purge 1``\n__**Make sure to add 1 more than the original amount.**__")

message.delete();

let messagecount = parseInt(messagenumber);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
break;

case "!vote":
let agree = "👍"
let disagree = "👎"
let pollresponse = args.slice(0).join(' ');
let polltime = args.slice(1).join(' ');

if(!pollresponse)
return message.reply("Please include a question:\n``!vote test 5``\n*Command, Question, Time (In Seconds)*")

if(!polltime)
return message.reply("Please include a time limit (in seconds):\n``!vote test 5``\n*Command, Question, Time (In Seconds)*")

message.channel.send({embed: {
  color: 0xff040b,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  description: "Vote 👍 or 👎 for the below questionarre.",
  fields: [{
      name: "**" + pollresponse + "**",
      value: "Time: " + polltime + " seconds",
    }
  ],
  timestamp: new Date(),
}
})

.then(function (message) {
message.react('👍') 
message.react('👎');

const vfilter = (reaction, user) => {
    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

message.awaitReactions(vfilter, { time: polltime*1000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
            message.channel.send('you reacted with a thumbs up.');
        }
        else {
            message.channel.send('you reacted with a thumbs down.');
        }
    })
    .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        message.channel.send('you didn\'t react with neither a thumbs up, nor a thumbs down.');
    });
  })
break;

case "!love":
let lover = message.mentions.members.first();

if(!lover)
return message.reply("Please mention somebody to love!")

message.delete();
message.channel.send({embed: {
    color: 0xff040b,
    author: {
      name: "Love is in the air!",
      icon_url: client.user.avatarURL,
    },
    thumbnail: {
      url: "https://vignette.wikia.nocookie.net/shipping/images/6/66/Pixel_heart_icon.png/revision/latest?cb=20151011174450"
    },
    title: "**Incoming Love!**",
    description: "**Love sent by:** " + message.author + "\n**Love sent to::** " + lover,
    },
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
);
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

case "!ping":
message.reply("Pong!")
break;

  case "!commands":
    message.channel.send({embed: {
    color: 0xff040b,
    author: {
    },
    thumbnail: {
      url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
    },
    title: "__**Commands (Page 1)**__",
    fields: [{
        name: "__**!ping**__",
        value: "This command pongs the user, which is a way to test bot status."
      },
      {
        name: "__**!hello**__",
        value: "This command replies Hey there!. Another way to test bot status."
      },
      {
        name: "__**!commands**__",
        value: "This command displays all available commands."
      },
      {
        name: "__**!avatar**__",
        value: "This command mentions you with a link to your profile picture. You can also mention other users to see their avatar."
      },
      {
        name: "__**!suggest**__",
        value: "This command will send me your suggestions for the bot."
      },
      {
        name: "__**!roll**__",
        value: "This command will roll a random number for you."
      },
      {
        name: "__**!userinfo**__",
        value: "This command will display your Discord account information."
      },
      {
        name: "__**!love**__",
        value: "This command will send love to a mentioned user."
      }
    ],
    footer: {
      text: "To see the other commands, use `!commands2`."
    }
  }
});
break;

case "!commands2":
message.channel.send({embed: {
color: 0xff040b,
author: {
},
thumbnail: {
  url: "http://simpleicon.com/wp-content/uploads/gear-2.png"
},
title: "__**Commands (Page 2)**__",
fields: [{
  name: "__**!owranks**__",
  value: "Provides a detailed list of all current Overwatch competitive ranks and their SR ranges."
},
{
  name: "__**!youtube**__",
  value: "When used, it displays a search with whatever aregument came after !youtube."
},
{
  name: "__**!rotmgchars**__",
  value: "Displays a list of all current RotMG characters with weapons and abilities."
},
{
  name: "__**!info**__",
  value: "This command will display information about the bot."
}
],
footer: {
  text: "Thats all the commands for now, more to be added!"
}
}
});
break;


case "!hello":
  message.channel.send("Hey there!");
break;


case "!avatar":
let avataruser = message.mentions.users.first();

if(avataruser)
return message.reply(avataruser.avatarURL);

if(!avataruser)
return message.reply(message.author.avatarURL);

break;

case "!roll":
  message.channel.send("**You rolled a **`" + Math.floor(Math.random() * 100) + "`");
break;

case "!coinflip":
var flip = Math.floor(Math.random() * 2 + 1);
if (flip === 1) {
  message.reply({embed: {
    color: 0xff040b,
    author: {
      name: `Coinflip | ${message.author.tag}`,
      icon_url: message.author.avatarURL,
    },
    thumbnail: {
      url: "http://www.clker.com/cliparts/7/d/e/0/139362185558690588heads-md.png"
    },
    title: `**${message.author.tag}, the coin landed** __**heads!**__`,
    },
    timestamp: new Date(),
    }
);
}
else {
  message.reply({embed: {
    color: 0xff040b,
    author: {
      name: `Coinflip | ${message.author.tag}`,
      icon_url: message.author.avatarURL,
    },
    thumbnail: {
      url: "http://www.clker.com/cliparts/4/a/2/6/1393621733287511319tails-md.png"
    },
    title: `**${message.author.tag}, the coin landed** __**tails!**__`,
    },
    timestamp: new Date(),
    }
);
}
break;

case "!kick":
if(!message.member.roles.some(r=>["Administrator", "LH Group System", "Officer", "Admin", "Head Raid leader"].includes(r.name)) )
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

       }
    
});

client.login(process.env.BOT_TOKEN);
