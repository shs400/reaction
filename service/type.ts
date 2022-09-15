export type SetData = {
	size: number;
	startDirection: ReqStartDirection;
};

export type Content = any;

export type ItemId = string[];

export type ItemPosition = { left: string } | { right: string };

export type Item = {
	size: number;
	id: string;
	position: ItemPosition;
	time: number;
	bottom: number;
	width: number;
	height: number;
	delay: number;
	startDirection: string;
	content?: Content;
};

export type AnimationType = "scale" | "opacity";
export type ReqStartDirection = "left" | "right" | "mix";
export type Position = "left" | "right" | "full";
