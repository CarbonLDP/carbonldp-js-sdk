import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import * as Pointer from "./../Pointer";

export const RDF_CLASS:string = NS.SHACL.Class.ValidationResult;

export const SCHEMA:ObjectSchema.Class = {
	"focusNode": {
		"@id": NS.SHACL.Predicate.focusNode,
		"@type": "@id",
	},
	"resultPath": {
		"@id": NS.SHACL.Predicate.resultPath,
		"@type": "@id",
	},
	"value": {
		"@id": NS.SHACL.Predicate.value,
	},
	"sourceShape": {
		"@id": NS.SHACL.Predicate.sourceShape,
		"@type": "@id",
	},
	"sourceConstraintComponent": {
		"@id": NS.SHACL.Predicate.sourceConstraintComponent,
		"@type": "@id",
	},
	"detail": {
		"@id": NS.SHACL.Predicate.detail,
		"@type": "@id",
	},
	"resultMessage": {
		"@id": NS.SHACL.Predicate.resultMessage,
		"@type": NS.XSD.DataType.string,
	},
	"resultSeverity": {
		"@id": NS.SHACL.Predicate.resultSeverity,
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
