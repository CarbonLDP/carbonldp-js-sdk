import { TagDef } from "./TagDef";
import { Document } from "dgeni";

export function module():TagDef {
	return {
		name: "module",
		defaultFn( doc:Document ):string {
			if( doc.docType === "module" ) return;

			const moduleDoc:Document = doc.moduleDoc || doc.containerDoc.moduleDoc;
			return moduleDoc.id;
		},
	};
}
