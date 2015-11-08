/// <reference path="../typings/es6/es6.d.ts" />
import * as NS from './NS';
import * as RDF from './RDF';
import * as Utils from './Utils';

const RDFClass:string = NS.C.Class.API;

const Definition:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"version": {
		"uri": NS.C.Predicate.version,
		"multi": false,
		"literal": true
	},
	"buildDate": {
		"uri": NS.C.Predicate.buildDate,
		"multi": false,
		"literal": true
	}
} );

interface APIDescription {
	version:string;
	buildDate:Date;
}

export default APIDescription;

export {
	APIDescription as Class,
	Definition,
	RDFClass
};