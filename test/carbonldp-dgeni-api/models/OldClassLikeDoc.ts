import { SuiteDoc } from "./SuiteDoc";

export interface OldClassLikeDoc extends SuiteDoc {
	description?:string;
	generics?:string[];
}
