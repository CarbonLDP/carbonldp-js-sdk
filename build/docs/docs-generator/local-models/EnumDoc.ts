import { SuiteDoc } from "./SuiteDoc";

export interface EnumeralDoc {
	name:string;
	description?:string;
}

export interface EnumDoc extends SuiteDoc {
	description?:string;
	enumerals:EnumeralDoc[];
}
