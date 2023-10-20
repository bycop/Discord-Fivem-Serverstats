import axios from 'axios';
import { EmbedBuilder, Guild, TextChannel } from 'discord.js';

import config from './config.js';
import { IDynamic, IEndpoints, IError, IInfo, IPlayers } from './types.js';

export async function makeRequest(endpoint: IEndpoints): Promise<IPlayers | IDynamic | IInfo | IError> {
	try {
		const response = await axios.get(`${config.api}${endpoint}`);
		return response.data;
	}
	catch (error: any) {
		return { error: error?.message ?? "Unknown error" };
	}
}

export async function refreshChannel(guild: Guild, channelId: string): Promise<void> {
	const channel = guild.channels.cache.get(channelId) as TextChannel;
	if (!channel) return;

	const dynamic = await makeRequest(IEndpoints.dynamic) as IDynamic;
	if ("error" in dynamic) {
		console.log(`Error: ${dynamic.error}`);
		if (config.refreshChannel?.type === "name" || config.refreshChannel?.type === "both") channel.setName(`0-players`);
		if (config.refreshChannel?.type === "topic" || config.refreshChannel?.type === "both") channel.setTopic(`Error: ${dynamic.error}`);
	}
	else {
		if (config.refreshChannel?.type === "name" || config.refreshChannel?.type === "both") channel.setName(`${dynamic.clients}-players`);
		if (config.refreshChannel?.type === "topic" || config.refreshChannel?.type === "both") channel.setTopic(`Players: ${dynamic.clients}/${dynamic.sv_maxclients}`);
	}
}

export async function refreshEmbed(guild: Guild, channelId: string, messageId: string): Promise<void> {
	const channel = guild.channels.cache.get(channelId) as TextChannel;
	if (!channel) return;

	const message = await channel.messages.fetch(messageId);
	if (!message) return;

	const embed = new EmbedBuilder()
		.setColor("#088408")
		.setTitle("Server status")
		.setTimestamp();

	const dynamic = await makeRequest(IEndpoints.dynamic) as IDynamic;
	if ("error" in dynamic) {
		embed.setDescription(`**Status**: 🔴\n**Players:** 0\n\`Error: ${dynamic.error}\``);
	}
	else {
		embed.setDescription(`**Status**: 🟢\n**Players:** ${dynamic.clients}/${dynamic.sv_maxclients}`);
	}

	await message.edit({ content: "", embeds: [embed] });
}