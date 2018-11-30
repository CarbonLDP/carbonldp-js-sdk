import { ClassDoc } from "./ClassDoc";
import { EnumDoc } from "./EnumDoc";
import { InterfaceDoc } from "./InterfaceDoc";
import { MethodDoc } from "./MethodDoc";
import { PropertyDoc } from "./PropertyDoc";
import { ReexportDoc } from "./ReexportDoc";
import { SuiteDoc } from "./SuiteDoc";
import { TypeAlias } from "./TypeAlias";

export interface ModuleDoc extends SuiteDoc {
	interfaces:InterfaceDoc[];
	classes:ClassDoc[];
	enums: EnumDoc[];
	typeAliases: TypeAlias[];

	reexports:ReexportDoc[];

	properties?:{
		static:PropertyDoc[];
	};
	methods?:{
		static:MethodDoc[];
	};
}
