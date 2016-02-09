interface NetworkColor {
	border?:string;
	background?:string;
	highlight?: { border?:string, background?:string };
	hover?: { border?:string; background?:string };
	inherit?:string;
	opacity?:number;
}

interface NetworkFont {
	color?:string; // "#D2E5FF"
	size?:number; // "px"
	face?:string; // "arial"
	background?:string; // "#D2E5FF"
	strokeWidth?:number; // "px"
	strokeColor?:string; // "#ffffff"
	align?:string; // "horizontal"
}

interface NetworkShadow {
	enabled?:boolean;
	color?:string; // "rgb(255,255,255)"
	size?:number;
	x?:number;
	y?:number;
}

interface NetworkNodeIcon {
	face?:string; // "FontAwesome/Ionicons"
	code?:string; // "\uf007"
	size?:number; // 50;
	color?: string; // "#ffffff"
}

interface NetworkScaling {
	min?:number;
	max?:number;
	label?: {
		enabled?:boolean,
		min?:number,
		max?:number,
		maxVisible?:number,
		drawThreshold?:number,
	};
	customScalingFunction?:( min:number, max:number, total:number, value:number ) => number;
}

interface NetworkNode {
	borderWidth?:number;
	borderWidthSelected?:number;
	brokenImage?:string;
	color?:NetworkColor;
	fixed?:{ x?:boolean, y?:boolean };
	font?:NetworkFont;
	group?:string;
	hidden?:boolean;
	icon?:NetworkNodeIcon;
	id?:string;
	image?:string; // URL
	label?:string;
	labelHighlightBold?:boolean;
	level?:number;
	mass?:number;
	physics?:boolean;
	scaling?:NetworkScaling;
	shadow?:NetworkShadow;
	shape?:string; // "Label inside: ellipse/circle/database/box/text, label outside: image, circularImage, diamond, dot, star, triangle, triangleDown, square, icon"
	shapeProperties?:{
		borderDashes?:boolean, // Only for borders
		borderRadius?:number, // Only for box shape
		useImageSize?:boolean,  // Only for image and circularImage shapes
		useBorderWithImage?:boolean,  // Only for image shape
	};
	size?:number;
	title?:string;
	value?:number;
	x?:number;
	y?:number;
}

interface NetworkEdge {
	arrows?:{
		to?:{ enabled?:boolean, scaleFactor?:number },
		middle?:{ enabled?:boolean, scaleFactor?:number },
		from?:{ enabled?:boolean, scaleFactor?:number },
	};
	color?:NetworkColor;
	dashes?:boolean;
	font?:NetworkFont;
	from:string;
	hidden?:boolean;
	hoverWidth?:number;
	id?:string;
	label?:string;
	labelHighlightBold?:boolean;
	length?:number;
	physics?:boolean;
	scaling?:NetworkScaling;
	selectionWidth?:number;
	selfReferenceSize?:number;
	shadow?:NetworkShadow;
	smooth?:{
		enabled?:boolean;
		type?:string; // "dynamic", "continuous", "discrete", "diagonalCross", "straightCross", "horizontal", "vertical", "curvedCW", "curvedCCW", "cubicBezier"
		forceDirection?:string | boolean; // "horizontal", "vertical", "none"
		roundness?:number; // 0 .. 1.0
	};
	title?:string;
	to:string;
	width?:number;
	value?:number;
}

declare class DataSet<T> {
	constructor( elements:T[] );
	constructor();

	length:number;

	add( data:T[] | T ):string[];
	clear():string[];
	distinct<T>( field:string ):T[];
	flush():void;
	// TODO: forEach()
	get( ids:string[] ):T[];
	get( id:string ):T;
	get():T[];
	getDataSet():DataSet<T>;
	// TODO: getIds():number[];
	// TODO: map()
	max( field:string ):T;
	min( field:string ):T;
	off( event:string, callback:( event:string, properties:any, senderId:string ) => void ):void;
	on( event:string, callback:( event:string, properties:any, senderId:string ) => void ):void;
	remove( id:string ):string[];
	remove( ids:string[] ):string[];
	setOptions( options:{ queue:( boolean | { delay:number, max:number } ) } ):void;
	update( data:T ):T[];
	update( data:T[] ):T[];
}

interface NetworkOptions {
	autoResize?:boolean;
	height?:string;
	width?:string;
	locale?:string;
	// TODO: locales?:locales
	clickToUse?:boolean;
	// TODO: configure?:{...},    // defined in the configure module.
	// TODO: edges?:{...},        // defined in the edges module.
	// TODO: nodes?:{...},        // defined in the nodes module.
	// TODO: groups?:{...},       // defined in the groups module.
	// TODO: layout?:{...},       // defined in the layout module.
	// TODO: interaction?:{...},  // defined in the interaction module.
	// TODO: manipulation?:{...}, // defined in the manipulation module.
	// TODO: physics?:{...},      // defined in the physics module.
}

declare class Network {
	constructor( container:HTMLElement, data:{ nodes:NetworkNode[] | DataSet<NetworkNode>, edges:NetworkEdge[] | DataSet<NetworkEdge> }, options:NetworkOptions );

	destroy():void;
	setData( data:{ nodes:DataSet<NetworkNode> | NetworkNode[], edges:DataSet<NetworkEdge> | NetworkEdge[] } ):void;
	// TODO: setOptions
	on( event:string, callback:() => void ):void;
	off( event:string, callback:() => void ):void;

}

interface Vis {
	DataSet:typeof DataSet;
	Network:typeof Network;
}

declare var vis:Vis;

declare module "vis/dist/vis" {
	export default vis;
}
