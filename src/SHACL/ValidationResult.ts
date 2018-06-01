import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";


export interface ValidationResult extends TransientResource {
	focusNode:Pointer;
	resultPath?:Pointer;
	value?:any;
	sourceShape?:Pointer;
	sourceConstraintComponent?:Pointer;
	detail?:Pointer;
	resultMessage?:string;
	resultSeverity?:Pointer;
}


export interface ValidationResultFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
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

export const ValidationResult:ValidationResultFactory = {
	TYPE: SHACL.ValidationResult,
	SCHEMA,
};
