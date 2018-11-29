import { Document } from "dgeni";

export function inlineParam():any {
	return {
		name: "param",
		handler( doc:Document, tag:"params", param:string ):string {
			// Template has no param anchor, so only return the name
			return param;
		},
	};
}
