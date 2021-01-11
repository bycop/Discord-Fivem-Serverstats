# Fivem Discord Serverstats

## Introduction

A simple node.js bot to send serverstats, playerlist and playercount of a Fivem Server to a Discord channel.

## Needs

You need to install Node.js and have a discord bot token on this page : https://discord.com/developers/applications

## Installation

Once you download the files and install node.js, make 'npm install' in the project folder. Then, go to the config.json file and add the asked informations
```javascript
{
    "prefix" : "!", //Your bot prefix
    "discord" : "Discord ID", //Discord server ID where the bot is
    "channel" : "Voice Channel ID" //The channel were the playercount can be write
    "ipabs" : "Server IP", //The server ip
    "port" : "Server port (like 30120)", //The server port
    "activity" : "GameActivity", //The message display on "Playing as"
    "max" : "100", //Max users of the server
    "token" : "" //Your bot token
}
```
Here you can disable the playercount voice channel, just delete the line channel.setName.
```javascript
bot.on('ready', () => {
  var interval = setInterval(function () {
    let guild = bot.guilds.cache.get(config.discord);
    let channel = guild.channels.cache.get(config.channel);
    Gamedig.query({
      type: 'fivem',
      host: config.ipabs, // This needs to be a string
      port: config.port // This needs to be a number & is optional, unless you're not using the default port for that gameserver type
    }).then((state) => {
      bot.user.setActivity(state.raw.clients + "/" + state.maxplayers);
      channel.setName(state.raw.clients + " Connected"); // Enable or disable the Channel player count
    }).catch((error) => {
      console.log(error);
    });
  }, 1000);
});
```

When you run the bot, the three commands are !serverstats, !playerlist and !playercount.

## Others Bots

Discord-global-chat : https://github.com/bycop/Discord-global-chat <br>
Discord-Image-to-twitter : https://github.com/bycop/Discord-Image-to-twitter <br>
Discord-Serverlist-InviteLinkByID : https://github.com/bycop/Discord-Serverlist-InviteLinkByID

