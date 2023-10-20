import { IConfig } from "./types";

export const config: IConfig = {
	api: "http://localhost:30120",
	guildId: "",
	refreshEmbed: { // Comment or delete to disable this module
		channelId: "",
		messageId: ""
	},
	refreshChannel: { // Comment or delete to disable this module
		channelId: "",
		type: "topic" // "name" for channel rename only, "topic" for channel topic only, "both" for both
	},
	refreshInterval: 300000 // Do not set this value to low or you can be rate limited by API/Discord
}

export default config;