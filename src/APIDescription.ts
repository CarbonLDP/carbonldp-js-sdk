/// <reference path="./../typings/tsd.d.ts" />
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.API;

export const SCHEMA:ObjectSchema.Class = {
	"version": {
		"@id": NS.C.Predicate.version,
		"@type": NS.XSD.DataType.string,
	},
	"buildDate": {
		"@id": NS.C.Predicate.buildDate,
		"@type": NS.XSD.DataType.dateTime,
	},
};

export interface Class {
	version:string;
	buildDate:Date;
}

export default Class;
