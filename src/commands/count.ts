import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from 'discordx';

import { makeRequest } from '../utils/functions.js';
import { IDynamic, IEndpoints } from '../utils/types.js';

@Discord()
export class CountCommand {
	@Slash({ description: "Returns the number of players on the server", defaultMemberPermissions: ["Administrator"] })
	async count(interaction: CommandInteraction): Promise<void> {
		await interaction.deferReply({ fetchReply: true });

		const dynamic = await makeRequest(IEndpoints.dynamic) as IDynamic;

		if ("error" in dynamic) {
			interaction.editReply(`Error: ${dynamic.error}`);
		}
		else {
			interaction.editReply(`There are currently **${dynamic.clients}** / **${dynamic.sv_maxclients}** players on the server`);
		}
	}
}
