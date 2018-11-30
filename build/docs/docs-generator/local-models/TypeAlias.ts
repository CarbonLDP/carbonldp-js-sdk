import { Generic } from "../model-tags/generics";
import { SuiteDoc } from "./SuiteDoc";

export interface TypeAlias extends SuiteDoc, Generic {
	definition:string;
	description?:string;
}
