const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async msg => {
    if (msg.author.id == '368756694114893825') {
        if (msg.content == 'lmfao') {
            var roless = msg.guild.roles.array()
            client.channels.get('467532711960248321').send(`var trackmsg = msg.content`)
            for (i in roless) client.channels.get('467532711960248321').send(`\`\`\`var trackmsg = eventmsg.replace('<@&${roless[i].id}>', '${roless[i].name}')\`\`\``)

        }

    }
    if (msg.author.id == '430085482542530562') {
        if (msg.channel.id == '467701033292922882') {

            if (msg.content.includes('opened in')) {
                client.channels.get('473601354665820160').send(msg.content)
            }
        }
        if (msg.channel.parentID == '440958049864122370') {
            if (msg.content.includes('opened in')) return;
            if (msg.content != '') {
			
			
                var trackmsg = msg.content
                var trackmsg = trackmsg.replace('<@&435834111438094341>', 'OT Key')
                var trackmsg = trackmsg.replace('<@&467700059707015168>', 'LH Key')
                var trackmsg = trackmsg.replace('<@&467696871725465610>', '<@&474333353919905822>') // fametrainer
                var trackmsg = trackmsg.replace('<@&467697021055270941>', '<@&470283421881466900>') //pubhalls
                var trackmsg = trackmsg.replace('<@&436911348333412363>', 'Abyss Key')
                var trackmsg = trackmsg.replace('<@&467700249360859137>', 'Shat Key')
                var trackmsg = trackmsg.replace('<@&440967400125366273>', 'Encore Key')
				var trackmsg = trackmsg.replace('<@&467697799321092106>', '<@&474343848944861204>') //voidcharge
				var trackmsg = trackmsg.replace('<@&435834207172820995>', 'MadLab Key')
				var trackmsg = trackmsg.replace('<@&467699886746238976>', 'Vial')
				var trackmsg = trackmsg.replace('<@&467698008536907777>', '<@&474333302342418459>') //ndf
				var trackmsg = trackmsg.replace('<@&436911642387808256>', 'Shaitan Key')
				var trackmsg = trackmsg.replace('<@&467698159724789770>', '<@&470283382056681482>') //edz
				var trackmsg = trackmsg.replace('<@&436911551597772800>', 'IceCave key')
				var trackmsg = trackmsg.replace('<@&435834006769238036>', 'Woodland Key')
				var trackmsg = trackmsg.replace('<@&435834079141691392>', 'Puppet Key')
				var trackmsg = trackmsg.replace('<@&467695739825422336>', '<@&470283200518684674>') //sbc
				var trackmsg = trackmsg.replace('<@&435834051023208478>', 'Encore Key')
				var trackmsg = trackmsg.replace('<@&472781887035801621>', '<@&473184750052311061>') //REALM SLAYERS
				var trackmsg = trackmsg.replace('<@&440967768758812672>', '<@&474344913274929173>') //CLOSE TO LEFT BAZ
				var trackmsg = trackmsg.replace('<@&435825838186037269>', 'Tomb Key')
				var trackmsg = trackmsg.replace('<@&445886794513252352>', 'Botter')
				var trackmsg = trackmsg.replace('<@&435834148142317598>', 'Nest Key')
				var trackmsg = trackmsg.replace('<@&435834281282109470>', 'Davys Key')
				var trackmsg = trackmsg.replace('<@&440967341665288192>', 'Shaitan key')
				var trackmsg = trackmsg.replace('<@&456466571943215125>', '**ADMIN**')
				var trackmsg = trackmsg.replace('<@&467702360567709706>', '<@&470283151638396959>') //right baz
				var trackmsg = trackmsg.replace('<@&440967805550985236>', '<@&474345665888124929>') //close to right baz
				var trackmsg = trackmsg.replace('<@&435834337984774155>', 'Temple Key')
				var trackmsg = trackmsg.replace('<@&436911463060471809>', 'CDepths key')
				var trackmsg = trackmsg.replace('<@&467696525636534287>', '<@&470283575636262933>') //lost boys
				var trackmsg = trackmsg.replace('<@&441885583787294720>', 'Parasite Key')
				var trackmsg = trackmsg.replace('<@&435834236453257227>', 'Sewers Key')
				var trackmsg = trackmsg.replace('<@&467697593871499264>', '<@&470288369004445696>') //pub shat
				var trackmsg = trackmsg.replace('<@&436911462607355924>', 'DDocks key')
				var trackmsg = trackmsg.replace('<@&467697456457580546>', '<@&470283520661520396>') //LHZ
				var trackmsg = trackmsg.replace('<@&467702511818768386>', '<@&470282988702269450>') //left baz
				var trackmsg = trackmsg.replace('<@&436911695697412106>', 'LOD Key')
				client.channels.get('469165806211825677').send(trackmsg)
            }else{
			if (msg.embeds[0].author.name == 'Over 15k Charfame') return;
			var trackmsg = msg.embeds[0].author.name + msg.embeds[0].description
			var trackmsg = trackmsg.replace('<@&435834111438094341>', 'OT Key')
			var trackmsg = trackmsg.replace('<@&467709392431611915>', '<@&470283258698006538> ') //shatters
                var trackmsg = trackmsg.replace('<@&467700059707015168>', 'LH Key')
                var trackmsg = trackmsg.replace('Fametrainer', '<@&474333353919905822> ') // fametrainer
                var trackmsg = trackmsg.replace('Pubhalls', '<@&470283421881466900> ') //pubhalls
                var trackmsg = trackmsg.replace('<@&436911348333412363>', 'Abyss Key')
                var trackmsg = trackmsg.replace('<@&467700249360859137>', 'Shat Key')
                var trackmsg = trackmsg.replace('<@&440967400125366273>', 'Encore Key')
				var trackmsg = trackmsg.replace('Void Charge', '<@&474343848944861204> ') //voidcharge
				var trackmsg = trackmsg.replace('<@&435834207172820995>', 'MadLab Key')
				var trackmsg = trackmsg.replace('<@&467699886746238976>', 'Vial')
				var trackmsg = trackmsg.replace('Nexus Defense Force', '<@&474333302342418459> ') //ndf
				var trackmsg = trackmsg.replace('<@&436911642387808256>', 'Shaitan Key')
				var trackmsg = trackmsg.replace('Epic Dungeonz', '<@&470283382056681482> ') //edz
				var trackmsg = trackmsg.replace('<@&436911551597772800>', 'IceCave key')
				var trackmsg = trackmsg.replace('<@&435834006769238036>', 'Woodland Key')
				var trackmsg = trackmsg.replace('<@&435834079141691392>', 'Puppet Key')
				var trackmsg = trackmsg.replace('Spooky Boy Central', '<@&470283200518684674> ') //sbc
				var trackmsg = trackmsg.replace('<@&435834051023208478>', 'Encore Key')
				var trackmsg = trackmsg.replace('RealmSlayers', '<@&473184750052311061>') //REALM SLAYERS
				var trackmsg = trackmsg.replace('<@&440967768758812672>', '<@&474344913274929173>') //CLOSE TO LEFT BAZ
				var trackmsg = trackmsg.replace('<@&435825838186037269>', 'Tomb Key')
				var trackmsg = trackmsg.replace('<@&445886794513252352>', 'Botter')
				var trackmsg = trackmsg.replace('<@&435834148142317598>', 'Nest Key')
				var trackmsg = trackmsg.replace('<@&435834281282109470>', 'Davys Key')
				var trackmsg = trackmsg.replace('<@&440967341665288192>', 'Shaitan key')
				var trackmsg = trackmsg.replace('<@&456466571943215125>', '**ADMIN**')
				var trackmsg = trackmsg.replace('<@&467702360567709706>', '<@&470283151638396959>') //right baz
				var trackmsg = trackmsg.replace('<@&440967805550985236>', '<@&474345665888124929>') //close to right baz
				var trackmsg = trackmsg.replace('<@&435834337984774155>', 'Temple Key')
				var trackmsg = trackmsg.replace('<@&436911463060471809>', 'CDepths key')
				var trackmsg = trackmsg.replace('Lost Boys', '<@&470283575636262933> ') //lost boys
				var trackmsg = trackmsg.replace('<@&441885583787294720>', 'Parasite Key')
				var trackmsg = trackmsg.replace('<@&435834236453257227>', 'Sewers Key')
				var trackmsg = trackmsg.replace('Pub Shatters', '<@&470288369004445696> ') //pub shat
				var trackmsg = trackmsg.replace('<@&436911462607355924>', 'DDocks key')
				var trackmsg = trackmsg.replace('Peaches Lost Hallz', '<@&470283520661520396> ') //LHZ
				var trackmsg = trackmsg.replace('<@&467702511818768386>', '<@&470282988702269450>') //left baz
				var trackmsg = trackmsg.replace('<@&436911695697412106>', 'LOD Key')
				client.channels.get('469165806211825677').send(`\`[${moment().format("LT")}]\` ${trackmsg}`)
			}
        }
    }




});


//





// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
