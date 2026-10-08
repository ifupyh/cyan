export type Moment = {
	year: string;
	date: string;
	type: string;
	tone: string;
	lines: string[];
	image?: { src: string; alt: string };
};

export const moments: Moment[] = [
	{
		year: "2026",
		date: "10.6",
		type: "记录",
		tone: "aurora",
		lines: ["把看见的、想起的，都放在这里。"],
	},
	{
		year: "2026",
		date: "10.5",
		type: "心事",
		tone: "aurora",
		lines: ["一滴泪真正的重量，取决于它落在谁的心上。"],
	},
	{
		year: "2026",
		date: "10.4",
		type: "碎碎念",
		tone: "watercolor",
		lines: ["何时才能随心所欲用顶级大模型。"],
	},
	{
		year: "2026",
		date: "10.3",
		type: "心愿",
		tone: "mist",
		lines: ["如果学会读心术就好了", "就不会这么累了"],
	},
	{
		year: "2026",
		date: "10.2",
		type: "释怀",
		tone: "journal",
		lines: ["犯错没关系，失去也没关系，这些年的浪费也没关系，都没关系。"],
	},
	{
		year: "2026",
		date: "10.1",
		type: "实验",
		tone: "ticket",
		lines: ["把复杂留给代码，把从容还给生活。"],
	},
];
