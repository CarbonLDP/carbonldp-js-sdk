import { Document } from "dgeni";

export interface TagDef {
	name:string;
	transforms?:any;
	defaultFn?( doc:Document ):any;
}

