import { SuiteDoc } from "./SuiteDoc";

export interface ClassLikeDoc extends SuiteDoc {
	description?:string;
	generics?:string[];

	"super-classes"?:string[];
	interfaces?:string[];
}
