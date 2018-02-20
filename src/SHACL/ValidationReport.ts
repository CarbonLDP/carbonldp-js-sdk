import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as ValidationResult from "./ValidationResult";

export const RDF_CLASS:string = NS.SHACL.ValidationReport;

export const SCHEMA:ObjectSchema.Class = {
	"conforms": {
		"@id": NS.SHACL.conforms,
		"@type": NS.XSD.DataType.boolean,
	},
	"results": {
		"@id": NS.SHACL.result,
		"@type": "@id",
		"@container": "@set",
	},
	"shapesGraphWellFormed": {
		"@id": NS.SHACL.shapesGraphWellFormed,
		"@type": NS.XSD.DataType.boolean,
	},
};

export interface Class {
	conforms:boolean;
	results?:ValidationResult.Class[];
	shapesGraphWellFormed?:boolean;
}

export default Class;
