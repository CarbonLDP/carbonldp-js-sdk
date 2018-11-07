import { MemberLike } from "./MemberLike";

export interface Returns {
	type:string;
	description?:string;
}

export interface Arguments {
	name:string;
	type:string;
	description?:string;
}

export interface Signature extends MemberLike {
	name:string;
	generics:string[];
	description?:string;
	arguments:Arguments[];
	returns:Returns;
}

export interface MethodDoc {
	name:string;
	signatures:Signature[];
	returns:Returns;
}
