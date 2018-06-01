const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
const ms = require('ms');
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
/*const yourID = "368756694114893825"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!createrolemessage"
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["RotMG", "NSFW", "Raid Ping"];
const reactions = ["444719782869073922", "444720053427109898", "444720908196642847"];


//Load up the bot...



//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}


client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == client.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != client.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
*/
//line 123 is where lhgs specific starts. 

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
client.user.setPresence({ game: { name: `in Shatters! | !commands`, type: 0 }});
    });


client.on('guildMemberAdd', member => {

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

client.on('message', msg => {
    if (msg.content.startsWith('!verify')) {
        var argss = msg.content.split(" ");
        if (msg.member.roles.some(r => ["Shatters"].includes(r.name))) {
            msg.author.send("You are already verified!")
            msg.delete();
            return;
        }
        msg.delete();
        let ruser = argss[1]
            let rcode = ("SC" + Math.floor(Math.random(11111) * 99999));
let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f=c;"
if (!test[msg.author.id]) test[msg.author.id] = {ign: `${ruser}`, code: `${rcode}`}
        msg.delete();
        .catch(console.error);
        let userdata = test[msg.author.id]

                msg.author.send({
                    embed: {
                        color: 0xa3fb7a,
                        author: {
                            name: `Verification | @${msg.author.tag}`,
                            icon_url: msg.author.avatarURL
                        },
                        fields: [{
                                name: "**Your Code:**",
                                value: `__**${userdata.code}**__`,
                                inline: true,
                            },
                            {
                                name: "**Realmeye Link:**",
                                value: `https://www.realmeye.com/player/${userdata.ign}`,
                                inline: true,
                            },
                            {
                                name: `Place your verification code on any line of your description, but __*it must be the only piece of text on that line.*__`,
                                value: "Once you have placed the code, type `done` in #verify",
                            },
                        ],
                        footer: {
                            text: "⚠ Be sure to follow the directions above exactly, or your verification will fail",
                        }
                    }
               
});
    
        console.log(test)
fs.writeFile('./test.json', JSON.stringify(test), console.error);
        
    }
    if (msg.content.startsWith('done')) {
        
        if (msg.member.roles.some(r => ["Shatters"].includes(r.name))) 
            return;
        let userdatadone = test[msg.author.id]
        if (!userdatadone) {
            msg.author.send("Your IGN and Code was not found in the database, please go to #verify and type `!verify IGN`!")
            msg.delete()
            return;
        }
        msg.delete();
        console.log(userdatadone)
                   let codexd =  userdatadone.code
                   let ignxd = userdatadone.ign
                   let rrapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ignxd + "&f=c;"
                   
        
        snekfetch.get(rrapi).then(r => {
                        let rdesc = r.body.description;
                        let rname = r.body.name
                        let rstars = r.body.rank
                        let rlocation = r.body.last_seen
                        let rfame = r.body.fame

                        if (!rdesc.includes(codexd))
                            return msg.author.send("Your code was not found in any line of your description. Make sure that your code is the ONLY piece of text in one line of your description.")


                        if (rstars < (14))
                            return msg.author.send("You do not have enough stars to be verified! You have " + rstars + ". You need __**14**__.")


                        if (!rlocation.includes("hidden"))
                            return msg.author.send("Your location is not hidden so you cannot be verified!")

                        if (rfame < (500))
                            return msg.author.send("Your do not have enough fame to be verified! You have " + rfame + ". You need __**500**__.")


                        if (rdesc.includes(codexd))
                            msg.guild.member(msg.author).setNickname(`${rname}`)
                        let lelxdppebtw = msg.guild.roles.find("name", "Shatters");
                        // id wasnt working some times, 433784738998910977
                        msg.guild.member(msg.author).addRole(lelxdppebtw.id)
                        msg.author.send("You have successfully been verified!");
                        client.channels.get("451179074593751040").send({
                            embed: {
                                color: 0xfb7ae4,
                                author: {
                                    name: `User Verified | <@${msg.author.tag}>`,
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


                    })


                }
    })

client.on('message', function(message) {
    var args = message.content.split(" ");
    var cmd = args[0];

    args = args.splice(1);

    switch (cmd) {
            
            case "!suspend":
            var argsss = message.content.split(" ");
        if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Raid Leader", "Almost Raid Leader", "Officer"].includes(r.name)))
                return message.reply(":x: Sorry, you don't have permissions to use this!");
          let member2 = message.mentions.members.first();
          if(!member2) return message.reply(":x: " + "| You need to mention a user/member!");
          let muteRole2 = message.guild.roles.find("name", "Suspended");
          if(!muteRole2) return message.reply(":x: " + "| You do not have the \"Suspended Raider\" role created!");
          let verifiedrole = message.guild.roles.find("name", "Shatters");
          let time2 = argsss[2];
let reasonxd = args.slice(2).join(' ')
            if(!reasonxd) return message.reply(":x: " + "| Please provide a reason for the suspension!");
          if(!time2) {
            message.channel.send("Please provide a time for the suspension!");
          }else {
            member2.addRole(muteRole2.id);
            member2.removeRole(verifiedrole.id);
            client.channels.get("433798601148334081").send(member2 + ` has been suspended for ${ms(ms(time2), {long: true})}, Reason: ${reasonxd}!`);

            setTimeout(function(){
              member2.removeRole(muteRole2.id);
              member2.addRole(verifiedrole.id);
              client.channels.get("433798601148334081").send(member2 + ` has been unsuspended, suspension lasted for ${ms(ms(time2), {long: true})}`)

            }, ms(time2));

            };
            
break;
            

      /*  case "!verify":
            let ruser = args.slice(0).join("");
            let rcode = ("RR" + Math.floor(Math.random(11111) * 99999));
            let rapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f=c;"

            snekfetch.get(rapi).then(h => {
                let brdesc = h.body.description;

                if (!ruser)
                    return message.author.send("Please include a username after !verify! Any typos will cause your verification process to fail.")

                message.delete();

                message.author.send({
                    embed: {
                        color: 0xa3fb7a,
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
                                name: `Place your verification code on any line of your description, but __*it must be the only piece of text on that line.*__`,
                                value: `Your original Realmeye description will be sent back shortly.`,
                            },
                        ],
                        footer: {
                            text: "The bot will check in 60 seconds to see if you followed directions.",
                        }
                    }
                });

                setTimeout(function() {

                    snekfetch.get(rapi).then(r => {
                        let rdesc = r.body.description;
                        let rname = r.body.name
                        let rstars = r.body.rank
                        let rlocation = r.body.last_seen
                        let rfame = r.body.fame

                        if (!rdesc.includes(rcode))
                            return message.author.send("Your code was not found in any line of your description. Make sure that your code is the ONLY piece of text in one line of your description. Your previous Realmeye description was:\n```" + brdesc + "```")


                        if (rstars < (14))
                            return message.author.send("You do not have enough stars to be verified! You have " + rstars + ". You need __**14**__.\nYour previous Realmeye description was:\n```" + brdesc + "```")


                        if (!rlocation.includes("hidden"))
                            return message.author.send("Your location is not hidden so you cannot be verified!\nYour previous Realmeye description was:\n```" + brdesc + "```")

                        if (rfame < (500))
                            return message.author.send("Your do not have enough fame to be verified! You have " + rfame + ". You need __**500**__.\nYour previous Realmeye description was:\n```" + brdesc + "```")


                        if (rdesc.includes(rcode))
                            message.guild.member(message.author).setNickname(`${rname}`)
                        let lelxdppebtw = message.guild.roles.find("name", "Shatters");
                        // id wasnt working some times, 433784738998910977
                        message.guild.member(message.author).addRole(lelxdppebtw.id)
                        message.author.send("You have successfully been verified!\nYour previous Realmeye description was:\n```" + brdesc + "```");
                        client.channels.get("451179074593751040").send({
                            embed: {
                                color: 0xfb7ae4,
                                author: {
                                    name: `User Verified | ${message.author.tag}`,
                                    icon_url: message.author.avatarURL
                                },
                                fields: [{
                                        name: "**Realmeye Link:**",
                                        value: `https://www.realmeye.com/player/${ruser}`,
                                        inline: true,
                                    },
                                    {
                                        name: "__**User IGN**__",
                                        value: ruser,
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


                    })

                }, 60000);
            })

            break;*/

            case "!realmeye":
           let user = args.slice(0).join("");
           let rapii = "http://www.tiffit.net/RealmInfo/api/user?u=" + user + "&f=c;";
          
           message.delete();
           if(!user)
return message.channel.send("Please include a username after `!realmeye`.")
           
           snekfetch.get(rapii).then(r => {
let asdesc = r.body.description;
let asname = r.body.name
let asstars = r.body.rank
let aslocation = r.body.last_seen
let asfame = r.body.fame
let ascount = r.body.characterCount
let asacctfame = r.body.account_fame
let ascreated = r.body.created
let asskins = r.body.skins
let asguild = r.body.guild


           
           message.channel.send({embed: {
  color: 0xfbd27a,
  author: {
    name: "Realmeye Info for" + user,
    icon_url: client.user.avatarURL
  },
  fields: [
      {
      name: "Description",
      value: "Desc: " + asdesc,
      inline: true
    },
    {
      name: "Stars",
      value: "Stars: " + asstars,
      inline: true
    },
    {
      name: "Last-seen Location",
      value: "server: " + aslocation, 
      inline: true
    },
    {
      name: "Character Fame",
      value: "Fame: " + asfame, 
      inline: true
    },
           {
             name: "Account Fame",
             value: "Fame: " + asacctfame, 
             inlint: true
           },
           {
             name: "Account Created",
             value: "Date: " + ascreated,
             inline: true
           },
           {
             name: "Skin Count",
             value: "Skins: " + asskins,
             inline: true
           },
           {
             name: "Guild",
             value: "Guild:" + asguild,
             inline: true
           }
  ],
  timestamp: new Date(),
  footer: {
    icon_url: "https://cdn.discordapp.com/avatars/160140367554019329/a423acbb3957e25bce788915eda9414a.png?size=2048",
    text: "~Droid~#5799"
  }//end
  }})
})

  break;



        case "!afkcheck":
            if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Head Raid Leader", "Raid Leader", "Almost Raid Leader", "Officer"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");

            console.log("afk check for shatters started")
            /*var peoplee = client.channels.get('437782399175098368').members.array();

                var promisess = [];
                peoplee.forEach(person => {
                    promisess.push(person.setVoiceChannel('442250419994099714'));
                });
                Promise.all(promises);
            
            var peopleee = client.channels.get('437816756275380234').members.array();

                var promisesss = [];
                peopleee.forEach(person => {
                    promisesss.push(person.setVoiceChannel('442250419994099714'));
                });
                Promise.all(promises);*/
            client.channels.get("433789873690902532").send('@here', {
                embed: {
                    color: 0xfbd27a,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "**An AFK-check for a Shatters Raid has started!**",
                    description: "React with <:Shatters:433791162411646988> and join queue to ensure you are in the next run! The AFK Check will end in 120 seconds!",

                    fields: [{
                            name: "If you have a key, and are willing to pop",
                            value: "react with <:shatterskey:434134124631031810>",
                            
                        },
                        {
                            name: "If you have a Priest you are willing to bring",
                            value: "react with <:priest:437301626118602774>",
                            
                        },
                        {
                            name: "If you have a Paladin you are willing to bring",
                            value: "react with <:paladin:437301465384484874>",
                            
                        },
                        {
                            name: "If you have a Warrior you are willing to bring",
                            value: "react with <:warrior:437301360304848899>",
                           
                        },
                        {
                            name: "If you have a Mystic you are willing to bring",
                            value: "react with <:mystic:448582513716101122>",
                            
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                    }
                }
            }).then(function(m) {
                m.react(message.guild.emojis.get('433791162411646988'))// shatters entity
                m.react(message.guild.emojis.get('434134124631031810')) // key
                m.react(message.guild.emojis.get('437301626118602774'))
                m.react(message.guild.emojis.get('437301465384484874'))
                m.react(message.guild.emojis.get('437301360304848899'))
                m.react(message.guild.emojis.get('448582513716101122'))
            }).then(setTimeout(function(m) {
                var people = client.channels.get('433784986072776714').members.array();

                var promises = [];
                people.forEach(person => {
                    promises.push(person.setVoiceChannel('433788028264120326'));
                });
                Promise.all(promises);
                 client.channels.get("433789873690902532").send({
                embed: {
                    color: 0xff040b,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "**The AFK-Check has ended!**",
                    description: "Please be patient and wait for the next afk-check. If you are in the run, please listen to the Raid Leader's instructions.",
                }
            })
               
                
            }, 120000))
            /*.then(async (m) => {
                const filter = (reaction, user) => reaction.emoji.id === '437861607792443395';
                const reactions = await m.awaitReactions(filter, {
                    time: 20000
                }).then((collected) => {
                    let mapped = collected.map(m => m.users.id);
mapped.forEach(id => {
  const member = guild.member(id);
  if (!member || !member.voiceChannel) return;
  member.setVoiceChannel('450366721543503892').catch(e => {});
});
                });
            })*/


            break;
            
        

        case "!info":
            message.delete();

            message.channel.send({
                embed: {
                    color: 0xfbd27a,
                    author: {
                        name: "Bridge Guardian Info",
                        icon_url: client.user.avatarURL
                    },
                    fields: [{
                            name: "__**Version**__",
                            value: "1.0.0",
                            inline: true,
                        },
                        {
                            name: "__**Release Date**__",
                            value: "5/27/18",
                            inline: true,
                        },
                        {
                            name: "__**Information**__",
                            value: "The Bridge Guardian was coded using JavaScript and serves Shatters Central."
                        },
                        {
                            name: "__**Shatters Central Invite**__",
                            value: "Invite people to Shatters Central! : https://discord.gg/zNZUHbe"
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

      /*  case "!suggest":
            let suggestion = args.slice(0).join(' ');

            if (!suggestion)
                return message.reply("Please include a suggestion for the bot!")

            message.delete();
            message.reply("Thank you for the suggestion!")
            client.channels.get("441416698420265000").send({
                    embed: {
                        color: 0x927afb,
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
                .then(message => {
                    message.react("✅")
                    message.react("❎")
                })
            break;
*/
        case "!rotmgchars":
            message.channel.send({
                embed: {
                    color: 0x000000,
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

            if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Officer", "Chat Mod", "Raid Leader", "Almost Raid Leader"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");

            if (!members)
                return message.reply("Please mention a valid member of this server!");

            let reason = args.slice(1).join(' ');
            if (!reason)
                return message.reply("Please indicate a reason for the warn!");

            message.channel.send(`***✅ ${members.user.tag} has been warned.***`);
            client.channels.get("433798601148334081").send({
                embed: {
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
            message.mentions.users.first().send(`You were warned in Shatters Central, Reason: ${reason}`);
            break;

        case "!kick":
            if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Owner", "Admin", "Officer", "Head Raid Leader"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");

            let member = message.mentions.members.first();

            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

            let kreason = args.slice(1).join(" ");
            if (!kreason)
                return message.reply("Please indicate a reason for the kick!");

            let kkreason = args.slice(1).join(' ');
            member.kick(kreason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            client.channels.get("433798601148334081").send({
                embed: {
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

            if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Admin", "Owner"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");

            if (!bmember)
                return message.reply("Please mention a valid member of this server");
            if (!bmember.bannable)
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

            let breason = args.slice(1).join(' ');
            if (!breason)
                return message.reply("Please indicate a reason for the ban!");

            bmember.ban(breason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            client.channels.get("433798601148334081").send({
                embed: {
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

        /*case "!rotmg":
            message.guild.member(message.author).addRole("442240483327213578");
            message.channel.send("The user " + message.author + " was given the role ``RotMG``");
            break;
        case "!rrotmg":
            message.guild.member(message.author).removeRole("442240483327213578");
            message.channel.send("The user " + message.author + " got ``RotMG`` removed.");
            break;*/


        case "!commands":
            message.channel.send({
                embed: {
                    color: 0x7aa3fb,
                    author: {},
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
                            name: "`!info`",
                            value: "Shows details about the bot!"
                        },
                        {
                            name: "`!userinfo`",
                            value: "This command will display your Discord account information."
                        },
                        
                        {
                            name: "`!realmeye <IGN>`",
                            value: "Gives basic data of a RotMG Player"
                        }
                    ],
                    footer: {
                        text: "If you have any question, feel free to pm Droid! More commands are coming!"
                    }
                }
            });
            break;
        case "!headcount":
              if (!message.member.roles.some(r => ["Administrator", "Shatters Central", "Raid Leader", "Almost Raid Leader", "Head Raid leader"].includes(r.name)))
return message.reply("Sorry, you don't have permissions to use this!");
    	client.channels.get('433789873690902532').send("@here Headcount! React with <:Shatters:433791162411646988> to participate and <:Key:434134124631031810> if you have a key and are willing to pop!").then(oldMessage => {
             
        oldMessage.react(message.guild.emojis.get('433791162411646988'))
        oldMessage.react(message.guild.emojis.get('434134124631031810'))
             .catch(console.error);
})
            break;
        case "!staffcommands":
            message.channel.send({
                embed: {
                    color: 0x7aa3fb,
                    author: {},
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
                            value: "Suspends a user from participating in runs for a set amount of time. Example `!suspend @Droid 5d hacking`"
                        },
                        {
                            name: "`!afkcheck`",
                            value: "Starts an AFK Check. Use in #leader-bot-commands. Work in progress, but it is functional."
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


client.login(process.env.BOT_TOKEN)
