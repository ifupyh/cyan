import * as fs from "node:fs";
import * as path from "node:path";
import { siteConfig } from "@/config";
import type { SteamGame } from "@/types/steam";

const STEAM_API = "https://api.steampowered.com";
const CACHE_PATH = path.resolve(".astro/steam-games.json");
const CACHE_TTL = 60 * 60 * 1000; // 缓存 1 小时
const FETCH_TIMEOUT = 5000; // 5 秒超时

type OwnedGamesResponse = {
	response?: {
		game_count?: number;
		games?: Array<{
			appid: number;
			name?: string;
			playtime_forever?: number;
			img_icon_url?: string;
		}>;
	};
};

function readCache(): SteamGame[] {
	try {
		if (!fs.existsSync(CACHE_PATH)) return [];
		const raw = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
		if (!Array.isArray(raw.games)) return [];
		if (Date.now() - (raw.timestamp || 0) > CACHE_TTL) return [];
		return raw.games;
	} catch {
		return [];
	}
}

function writeCache(games: SteamGame[]): void {
	try {
		fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
		fs.writeFileSync(
			CACHE_PATH,
			JSON.stringify({ timestamp: Date.now(), games }),
		);
	} catch {
		// 缓存写入失败，忽略
	}
}

/**
 * 获取 Steam 游戏库（按总游玩时长降序）。
 * 带 5 秒超时 + 本地缓存（1 小时），避免 Steam API 慢导致页面卡顿。
 */
export async function getSteamGames(): Promise<SteamGame[]> {
	const apiKey = siteConfig.steam?.apiKey || "";
	const steamId = siteConfig.steam?.steamId || "";
	if (!apiKey || !steamId) return [];

	// 优先用缓存（1 小时内不重新请求）
	const cached = readCache();
	if (cached.length > 0) return cached;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

	try {
		const url =
			`${STEAM_API}/IPlayerService/GetOwnedGames/v0001/` +
			`?key=${apiKey}&steamid=${steamId}&format=json` +
			`&include_appinfo=1&include_played_free_games=1`;

		const response = await fetch(url, { signal: controller.signal });
		if (!response.ok) return cached;

		const data = (await response.json()) as OwnedGamesResponse;
		const games = (data.response?.games ?? [])
			.filter((game) => game.name && game.img_icon_url)
			.map((game) => ({
				appid: game.appid,
				name: game.name as string,
				icon: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
				header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
				cover: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900_2x.jpg`,
				link: `https://store.steampowered.com/app/${game.appid}/`,
				playtimeForever: game.playtime_forever ?? 0,
			}))
			.sort((a, b) => b.playtimeForever - a.playtimeForever);

		writeCache(games);
		return games;
	} catch {
		// 超时或网络失败，回退到缓存
		return cached;
	} finally {
		clearTimeout(timeout);
	}
}

/**
 * 获取浮光集指定展示的游戏（从 siteConfig.steam.featured 构造，不调 Steam API）。
 * 封面/header 直接从 Steam CDN 按 appid 拼接。
 */
export function getFeaturedSteamGames(): SteamGame[] {
	const featured = siteConfig.steam?.featured || [];
	return featured.map((f) => ({
		appid: f.appid,
		name: f.name,
		icon: "",
		header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${f.appid}/header.jpg`,
		cover: `/assets/images/steam/${f.appid}.jpg`,
		link: `https://store.steampowered.com/app/${f.appid}/`,
		playtimeForever: 0,
	}));
}
