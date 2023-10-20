import type { Client } from "discordx";
import { Discord, On } from 'discordx';

import { bot } from '../main.js';
import config from '../utils/config.js';
import { refreshChannel, refreshEmbed } from '../utils/functions.js';

@Discord()
export class ReadyEvent {
	@On()
	async ready([client]: [Client]): Promise<void> {
		await bot.initApplicationCommands();
		console.log("Bot started");

		setInterval(async () => {
			const guild = await client.guilds.fetch(config.guildId);
			if (guild) {
				if (config.refreshChannel?.channelId) {
					refreshChannel(guild, config.refreshChannel.channelId);
				}
				if (config.refreshEmbed?.channelId && config.refreshEmbed?.messageId) {
					refreshEmbed(guild, config.refreshEmbed.channelId, config.refreshEmbed.messageId);
				}
			}
		}, config.refreshInterval);
	}
}
