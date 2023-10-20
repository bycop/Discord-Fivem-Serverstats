import { type CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Slash } from 'discordx';

import { Pagination, PaginationType } from '@discordx/pagination';

import { makeRequest } from '../utils/functions.js';
import { IEndpoints, IPlayer, IPlayers } from '../utils/types.js';

@Discord()
export class PlayersCommand {
	@Slash({ description: "Returns the list of players on the server", defaultMemberPermissions: ["Administrator"] })
	async players(interaction: CommandInteraction): Promise<any> {
		await interaction.deferReply({ fetchReply: true });

		const players = await makeRequest(IEndpoints.players) as IPlayers;

		if ("error" in players) return interaction.editReply(`Error: ${players.error}`);

		let embeds = [];

		for (let i = 0; i < players.length / 25; i++)
			embeds.push({
				embeds: [new EmbedBuilder()
					.setTitle(`Players list (${players.length})`)
					.setDescription(players.slice(i * 25, 25 * (i + 1)).map((player: IPlayer, index: number) => {
						return `${index + (i * 25) + 1}. ${player.name} - ${player.id} - ${player.ping}ms`
					}).join("\n").replaceAll("`", "'"))
					.setColor("#088408")
					.setTimestamp()]
			});

		const pagination = new Pagination(interaction, embeds, {
			time: 120000,
			type: PaginationType.Button,
			async onTimeout(page, message) {
				await interaction.editReply({ embeds: message.embeds, content: message.content ? message.content : undefined, components: [] })
			},
			showStartEnd: false
		});

		await pagination.send();
	}
}
