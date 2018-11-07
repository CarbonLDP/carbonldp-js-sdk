import { OldClassLikeDoc } from "./OldClassLikeDoc";
import { OldMethodDoc } from "./OldMethodDoc";
import { OldPropertyDoc } from "./OldPropertyDoc";
import { ReexportDoc } from "./ReexportDoc";
import { SuiteDoc } from "./SuiteDoc";

export interface OldModuleDoc extends SuiteDoc {
	interfaces:OldClassLikeDoc[];
	classes:OldClassLikeDoc[];
	reexports:ReexportDoc[];

	properties?:{
		static:OldPropertyDoc[];
	};
	methods?:{
		static:OldMethodDoc[];
	};
}
