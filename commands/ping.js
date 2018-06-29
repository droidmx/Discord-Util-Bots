module.exports.run = async (bot, msg, args) => {
const playAnimation = (msg, delay, list) => {
    if (list.length < 1)
        return;

    let next = list.shift();
    let start = now();

    msg.edit(next).then(() => {
        let elapsed = now() - start;

        setTimeout(() => {
            playAnimation(msg, delay, list);
        }, Math.max(50, delay - elapsed));
    });
};

msg.edit(':stopwatch: Ping').then(m => {
            let time = msg.editedTimestamp - msg.createdTimestamp;
            playAnimation(m, 500, [
                ':stopwatch: __P__ing',
                ':stopwatch: __Pi__ng',
                ':stopwatch: __Pin__g',
                ':stopwatch: __Ping__',
                `:stopwatch: ***Pong!*** \`${time}ms\``
            ]);
        });
    

    await msg.edit(':thinking: Ping');

}

module.exports.config = {
    command: "ping"
};
