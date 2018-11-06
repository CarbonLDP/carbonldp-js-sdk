import { OldClassLikeDoc } from "./OldClassLikeDoc";
import { ReexportDoc } from "./ReexportDoc";
import { SuiteDoc } from "./SuiteDoc";

export interface OldModuleDoc extends SuiteDoc {
	interfaces:OldClassLikeDoc[];
	classes:OldClassLikeDoc[];
	reexports:ReexportDoc[];
}
