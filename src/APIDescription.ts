/// <reference path="../typings/es6/es6.d.ts" />
import * as NS from "./NS";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.API;

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"version": {
		"uri": NS.C.Predicate.version,
		"multi": false,
		"literal": true,
	},
	"buildDate": {
		"uri": NS.C.Predicate.buildDate,
		"multi": false,
		"literal": true,
	},
} );

export interface Class {
	version:string;
	buildDate:Date;
}

export default Class;
