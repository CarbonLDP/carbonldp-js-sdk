import { ClassDoc } from "./ClassDoc";
import { EnumDoc } from "./EnumDoc";
import { InterfaceDoc } from "./InterfaceDoc";
import { MethodDoc } from "./MethodDoc";
import { PropertyDoc } from "./PropertyDoc";
import { ReexportDoc } from "./ReexportDoc";
import { SuiteDoc } from "./SuiteDoc";

export interface ModuleDoc extends SuiteDoc {
	interfaces:InterfaceDoc[];
	classes:ClassDoc[];
	enums: EnumDoc[];

	reexports:ReexportDoc[];

	properties?:{
		static:PropertyDoc[];
	};
	methods?:{
		static:MethodDoc[];
	};
}
