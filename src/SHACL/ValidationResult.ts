import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as Pointer from "./../Pointer";

export const RDF_CLASS:string = NS.SHACL.ValidationResult;

export const SCHEMA:ObjectSchema.Class = {
	"focusNode": {
		"@id": NS.SHACL.focusNode,
		"@type": "@id",
	},
	"resultPath": {
		"@id": NS.SHACL.resultPath,
		"@type": "@id",
	},
	"value": {
		"@id": NS.SHACL.value,
	},
	"sourceShape": {
		"@id": NS.SHACL.sourceShape,
		"@type": "@id",
	},
	"sourceConstraintComponent": {
		"@id": NS.SHACL.sourceConstraintComponent,
		"@type": "@id",
	},
	"detail": {
		"@id": NS.SHACL.detail,
		"@type": "@id",
	},
	"resultMessage": {
		"@id": NS.SHACL.resultMessage,
		"@type": NS.XSD.DataType.string,
	},
	"resultSeverity": {
		"@id": NS.SHACL.resultSeverity,
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
