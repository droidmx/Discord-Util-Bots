
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
      name: `Place your verification code on the __**first line**__ of your Realmeye description, __replacing everything else__.`,
      value: `Your original Realmeye description will be sent back shortly.`,
    },
  ],
  footer: {
    text: "The bot will check in 60 seconds to see if you followed directions.",
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
          message.guild.fetchMember(auser).setVoiceChannel("437973965789462530")
        }, 10000
)
  })
})
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
      timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
    }
  }
});
break;
       }
});


client.login(process.env.BOT_TOKEN);
