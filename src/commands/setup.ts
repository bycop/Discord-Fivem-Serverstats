import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from 'discordx';

@Discord()
export class SetupCommand {
  @Slash({ description: "Send an empty message to be configured for auto embed refresh", defaultMemberPermissions: ["Administrator"] })
  setup(interaction: CommandInteraction): void {
    interaction.reply({ content: "Setting up...", ephemeral: true });

    interaction.channel!.send("This message will be updated every 5 minutes with the latest server information when the bot is configured.\nYou can now copy the message ID and paste it in the config file with the channel ID.")
  }
}
