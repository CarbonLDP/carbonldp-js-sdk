import { TagDef } from "./TagDef";
import { Document } from "dgeni";

export function moduleDoc():TagDef {
	return {
		name: "module",
		defaultFn( doc:Document ):string | undefined {
			if( doc.docType === "module" ) return;

			const moduleDoc:Document = doc.moduleDoc || doc.containerDoc.moduleDoc;
			return moduleDoc.id;
		},
	};
}
