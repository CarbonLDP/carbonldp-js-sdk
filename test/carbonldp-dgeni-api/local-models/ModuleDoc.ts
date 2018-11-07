import { ClassLikeDoc } from "./ClassLikeDoc";
import { InterfaceDoc } from "./InterfaceDoc";
import { MethodDoc } from "./MethodDoc";
import { PropertyDoc } from "./PropertyDoc";
import { ReexportDoc } from "./ReexportDoc";
import { SuiteDoc } from "./SuiteDoc";

export interface ModuleDoc extends SuiteDoc {
	interfaces:InterfaceDoc[];
	classes:ClassLikeDoc[];
	reexports:ReexportDoc[];

	properties?:{
		static:PropertyDoc[];
	};
	methods?:{
		static:MethodDoc[];
	};
}
