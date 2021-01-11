# Fivem Discord Playerlist

## Introduction

A simple node.js bot to send playerlist and playercount of a Fivem Server to a Discord channel.

## Needs

You need to install Node.js and have a discord bot token on this page : https://discord.com/developers/applications

## Installation

Once you download the files and install node.js, make 'npm install' in the project folder. Then, go to the config.json file and add the asked informations
```javascript
{
    "prefix" : "!", //Your bot prefix
    "discord" : "Discord ID", //Discord server ID where the bot is
    "ipabs" : "Server IP", //The server ip
    "port" : "Server port (like 30120)", //The server port
    "activity" : "GameActivity", //The message display on "Playing as"
    "max" : "100", //Max users of the server
    "token" : "" //Your bot token
}
```

When you run the bot, the two commands are !playerlist and !playercount.

## Others Bots

Discord-global-chat : https://github.com/bycop/Discord-global-chat <br>
Discord-Image-to-twitter : https://github.com/bycop/Discord-Image-to-twitter <br>
Discord-Serverlist-InviteLinkByID : https://github.com/bycop/Discord-Serverlist-InviteLinkByID

