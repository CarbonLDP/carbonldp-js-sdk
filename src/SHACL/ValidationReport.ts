import { ObjectSchema } from "../ObjectSchema";
import { SHACL } from "../Vocabularies/SHACL";
import { XSD } from "../Vocabularies/XSD";
import { ValidationResult } from "./ValidationResult";


export interface ValidationReport {
	conforms:boolean;
	results?:ValidationResult[];
	shapesGraphWellFormed?:boolean;
}


export interface ValidationReportFactory {
	TYPE:string;
	SCHEMA:ObjectSchema;
}

const SCHEMA:ObjectSchema = {
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

export const ValidationReport:ValidationReportFactory = {
	TYPE: SHACL.ValidationReport,
	SCHEMA,
};

export default ValidationReport;
