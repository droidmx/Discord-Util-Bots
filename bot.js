//

const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const setupCMD = "!createrolemessage"

let initialMessage = `**React to the messages below to receive pings for each sever. The pings may come from AFK check notifications or the player tracker! If you would like to stop receiving pings, simply remove your reaction!**`;

const roles = ["Pub Halls", "Shatters", "Pub Shats", "SBC", "LHZ", "EDZ", "Lost Boys"];

const reactions = ["469180974958379011", "469181598206525472", "469181693215899649", "469181892571430915", "469181421626589196", "469181781883486208", "469182043759050764"];
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

function generateMessages() {

    var messages = [];

    messages.push(initialMessage);

    for (let role of roles) messages.push(`React below to get pings for **"${role}"**!`); //DONT CHANGE THIS

    return messages;

}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


client.on("message", message => {

    if (message.author.id == '368756694114893825' && message.content.toLowerCase() == setupCMD) {

        var toSend = generateMessages();

        let mappedArray = [
            [toSend[0], false], ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])
        ];

        for (let mapObj of mappedArray) {

            message.channel.send(mapObj[0]).then(sent => {

                if (mapObj[1]) {

                    sent.react(mapObj[1]);

                }

            });

        }

    }

})





client.on('raw', event => {

    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {



        let channel = client.channels.get(event.d.channel_id);

        let message = channel.fetchMessage(event.d.message_id).then(msg => {

            let user = msg.guild.members.get(event.d.user_id);



            if (msg.author.id == client.user.id && msg.content != initialMessage) {



                var re = `\\*\\*"(.+)?(?="\\*\\*)`;

                var role = msg.content.match(re)[1];



                if (user.id != bot.user.id) {

                    var roleObj = msg.guild.roles.find('name', role);

                    var memberObj = msg.guild.members.get(user.id);



                    if (event.t === "MESSAGE_REACTION_ADD") {

                        memberObj.addRole(roleObj)

                    } else {

                        memberObj.removeRole(roleObj);

                    }

                }

            }

        })



    }

});
client.on('message', async msg => {

    /*if (msg.author.id == '368756694114893825') {
    if (msg.content.includes('/add')) {
    var args = msg.content.split(" ");
    let guild = msg.guild;
        let toAdd = args[2];
        let title = args[1];

        if(!title || !toAdd) {
            return msg.channel.send('Please provide name and url for the emoji to add. Ex: >>addemoji <name> <url>');
        } else {
            guild.createEmoji(toAdd, title)
            .then(emoji => msg.react(emoji))
            .catch(console.log('Something went wrong.'));
          
        }
    }
    }*/
    if (msg.channel.id == '467445547557453837') {
        client.channels.get('467436171664949249').send(msg.content)
    }
    if (msg.channel.id == '469165806211825677') {
        client.channels.get('467421795490856960').send(msg.content)
    }
    if (msg.channel.id == '467532711960248321') {
        client.channels.get('461571905736933386').send(msg.content)
    }




});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
