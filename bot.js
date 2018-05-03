
const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");

client.on('guildMemberAdd', member => {
  
client.channels.get("409362377126182922").send({embed: {
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
       }
});


client.login(process.env.BOT_TOKEN);
