import { TagDef } from "./TagDef";
import { ApiDoc } from "dgeni-packages/typescript/api-doc-types/ApiDoc";
import { ExportDoc } from "dgeni-packages/typescript/api-doc-types/ExportDoc";

export function isDefault():TagDef {
	return {
		name: "isDefault",
		transforms: () => {
			return true;
		}
	};
}

function isExportDoc( doc:ApiDoc ):doc is ExportDoc {
	return "moduleDoc" in doc;
}

function sameID( doc1:ExportDoc, doc2:ExportDoc ):boolean {
	return doc1.id === doc2.id;
}
