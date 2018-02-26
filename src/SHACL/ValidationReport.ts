import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import * as ObjectSchema from "./../ObjectSchema";
import * as ValidationResult from "./ValidationResult";

export const RDF_CLASS:string = SHACL.ValidationReport;

export const SCHEMA:ObjectSchema.ObjectSchema = {
	"conforms": {
		"@id": SHACL.conforms,
		"@type": XSD.boolean,
	},
	"results": {
		"@id": SHACL.result,
		"@type": "@id",
		"@container": "@set",
	},
	"shapesGraphWellFormed": {
		"@id": SHACL.shapesGraphWellFormed,
		"@type": XSD.boolean,
	},
};

export interface Class {
	conforms:boolean;
	results?:ValidationResult.Class[];
	shapesGraphWellFormed?:boolean;
}

export default Class;
