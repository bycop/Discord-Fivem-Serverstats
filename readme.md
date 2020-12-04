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
    "ipabs" : "Server IP:Port", //The server ip with is port
    "activity" : "GameActivity", //The message display on "Playing as"
    "max" : "100", //Max users of the server
    "token" : "" //Your bot token
}
```
When you run the bot, the deux commands are !playerlist and !playercount. You can change the commands and restrict or no the playerlist command in the index.js file
