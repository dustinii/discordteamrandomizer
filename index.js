const Discord = require('discord.js');
const mee6 = require('mee6');

const client = new Discord.Client({
    intents: [
      'guilds',
      'guildMembers',
      'messages',
      'GUILDS',
      'GUILD_MESSAGES'
    ]
  });

client.on('message', async (message) => {
    if (message.content === '/randomize') {
        // Get the 10 names from the user
        let names = [];
        for (let i = 0; i < 10; i++) {
            names.push(await message.channel.awaitMessages(m => m.author.id === message.author.id && m.content.startsWith('Name '), { max: 1 }));
        }

        // Randomize the names into two teams
        let team1 = [];
        let team2 = [];
        for (let i = 0; i < names.length; i++) {
            if (Math.random() > 0.5) {
                team1.push(names[i].content);
            } else {
                team2.push(names[i].content);
            }
        }

        // Send a message to the channel with the two teams
        message.channel.send(`Team 1: ${team1.join(', ')}\nTeam 2: ${team2.join(', ')}`);
    }
});

client.login('[BOT_TOKEN_ID]');
