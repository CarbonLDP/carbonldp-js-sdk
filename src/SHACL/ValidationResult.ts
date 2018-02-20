import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";

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

export interface Class extends Resource.Class {
	focusNode:Pointer.Class;
	resultPath?:Pointer.Class;
	value?:any;
	sourceShape?:Pointer.Class;
	sourceConstraintComponent?:Pointer.Class;
	detail?:Pointer.Class;
	resultMessage?:string;
	resultSeverity?:Pointer.Class;
}

export default Class;
