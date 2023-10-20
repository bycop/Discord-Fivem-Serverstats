export interface IConfig {
	api: string;
	guildId: string;
	refreshEmbed?: {
		channelId?: string;
		messageId?: string;
	};
	refreshChannel?: {
		channelId?: string;
		type: "name" | "topic" | "both";
	};
	refreshInterval: number;
}

export enum IEndpoints {
	dynamic = "/dynamic.json",
	players = "/players.json",
	info = "/info.json",
}

export interface IDynamic {
	hostname: string;
	clients: number;
	sv_maxclients: number;
}

export interface IPlayer {
	id: number;
	identifiers: string[];
	name: string;
	ping: number;
}

export type IPlayers = IPlayer[];

export interface IInfo {
	resources: string[];
	server: string;
	vars: {
		[key: string]: string;
	}
}

export interface IError {
	error: string
}