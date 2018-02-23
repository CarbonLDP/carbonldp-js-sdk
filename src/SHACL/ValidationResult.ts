import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";

export const RDF_CLASS:string = SHACL.ValidationResult;

export const SCHEMA:ObjectSchema.Class = {
	"focusNode": {
		"@id": SHACL.focusNode,
		"@type": "@id",
	},
	"resultPath": {
		"@id": SHACL.resultPath,
		"@type": "@id",
	},
	"value": {
		"@id": SHACL.value,
	},
	"sourceShape": {
		"@id": SHACL.sourceShape,
		"@type": "@id",
	},
	"sourceConstraintComponent": {
		"@id": SHACL.sourceConstraintComponent,
		"@type": "@id",
	},
	"detail": {
		"@id": SHACL.detail,
		"@type": "@id",
	},
	"resultMessage": {
		"@id": SHACL.resultMessage,
		"@type": XSD.string,
	},
	"resultSeverity": {
		"@id": SHACL.resultSeverity,
		"@type": "@id",
	},
};

export interface Class extends Resource {
	focusNode:Pointer;
	resultPath?:Pointer;
	value?:any;
	sourceShape?:Pointer;
	sourceConstraintComponent?:Pointer;
	detail?:Pointer;
	resultMessage?:string;
	resultSeverity?:Pointer;
}

export default Class;
