import { Document } from "dgeni";

export interface TagDef {
	name:string;

	defaultFn( doc:Document ):any;
}
