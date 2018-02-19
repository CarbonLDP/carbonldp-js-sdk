import * as NS from "../Vocabularies/index";
import * as ObjectSchema from "./../ObjectSchema";
import * as ValidationResult from "./ValidationResult";

export const RDF_CLASS:string = NS.SHACL.Class.ValidationReport;

export const SCHEMA:ObjectSchema.Class = {
	"conforms": {
		"@id": NS.SHACL.Predicate.conforms,
		"@type": NS.XSD.DataType.boolean,
	},
	"results": {
		"@id": NS.SHACL.Predicate.result,
		"@type": "@id",
		"@container": "@set",
	},
	"shapesGraphWellFormed": {
		"@id": NS.SHACL.Predicate.shapesGraphWellFormed,
		"@type": NS.XSD.DataType.boolean,
	},
};

export interface Class {
	conforms:boolean;
	results?:ValidationResult.Class[];
	shapesGraphWellFormed?:boolean;
}

export default Class;
