# Discord FiveM Serverstats

## Introduction

A Typescript Discord bot to get information about your FiveM server with commands, refreshed embed, ...

## Needs

You need to install Node.js and get a discord bot token on this page : https://discord.com/developers/applications

## Installation

```sh
git clone https://github.com/bycop/Discord-Fivem-Serverstats # Or download it
cd Discord-Fivem-Serverstats
npm install
```
After downloading and installing npm dependencies you'll have to make some configurations:
1. Bot token:
    - Rename the `.env.example` file to `.env`
    - Replace `your_bot_token` by your token on [Discord Developer Portal](https://discord.com/developers/applications)
2. Configuration file:
    - In the `src/utils` folder, rename `config.example.ts` to `config.ts`
    - Then fill every needed informations:

```typescript
export const config: IConfig = {
	api: "http://lite.gtaliferp.fr:30120", // Your FiveM IP:port server
	guildId: "", // Your Discord server ID
	refreshEmbed: { // Comment or delete to disable this module (Details below)
		channelId: "1164955066961248266", // Channel ID where the embed should be
		messageId: "1164955160125132851" // Message ID of the embed
	},
	refreshChannel: { // Comment or delete to disable this module
		channelId: "1164947634268684428", // Channel ID to be renamed/topic changed automatically
		type: "both" // "name" for channel rename only, "topic" for channel topic only, "both" for both
	},
	refreshInterval: 300000 // Do not set this value to low or you can be rate limited by API/Discord
}
```

3. Configure auto-refresh Embed
    - Launch the bot with the command `npm run dev`
    - Then do the command `/setup` in the desired channel and copy the Message ID of the new message
    - Then put it on the config above

With all of this you've 2 commands:
`/players`: To show the full list of connecteds players of your server
`/count`: Show the amount of connecteds players / max players

## Others Bots

Discord-global-chat : https://github.com/bycop/Discord-global-chat <br>
Discord-Image-to-twitter : https://github.com/bycop/Discord-Image-to-twitter <br>
Discord-Serverlist-InviteLinkByID : https://github.com/bycop/Discord-Serverlist-InviteLinkByID <br>
Discord-csgo-Serverstats : https://github.com/bycop/Discord-csgo-Serverstats
