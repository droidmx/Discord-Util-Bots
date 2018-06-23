const Discord = require('discord.js');
const client = new Discord.Client();
const music = require('discord.js-musicbot-addon');


music.start(client, {
  youtubeKey: "AIzaSyAAKSiOkapv22Kt3OWNOAWeTcXJ0yLmJ90",
  prefix: ">>",
  leaveAlt: ["fuckoff", "fuckingleave"],
  helpCmd: "mhelp",
  thumbnailType: "high",
  maxQueueSize: 5,
  enableQueueStat: true,
  ownerOverMember: true,
  clearOnLeave: true,
  anyoneCanSkip: true,
  anyoneCanPause: true,
  logging: true,
  requesterName: true,
  embedColor: "RANDOM",
  checkQueues: true,
  pauseAlt: ['stop', 'wait'],
  botOwner: "368756694114893825"
});

client.login(process.env.BOT_TOKEN);
