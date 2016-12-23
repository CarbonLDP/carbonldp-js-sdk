import Documents from "./../Documents";

import SELECTResults from "./SELECTResults";
import RawResults from "./RawResults";

import HTTPResponse from "./../HTTP/Response";


import { QueryBuilder } from "sparqler";

declare module "sparqler/Clauses" {

	export interface FinishSelect {
		execute():Promise<[ SELECTResults, HTTPResponse ]>;
		executeRaw():Promise<[ RawResults, HTTPResponse ]>;
	}

}

declare module "sparqler/Sparqler" {

	export interface QueryBuilder {
		_documents:Documents;
		_entryPoint:string;
	}

}

// Add execute functions to the query builder
let queryPrototype:any = QueryBuilder.prototype;
let superInit:Function = queryPrototype.initInterfaces;
queryPrototype.initInterfaces = function():void {
	superInit.call( this );
	let self:QueryBuilder = this as QueryBuilder;

	// Add execution of select
	this.interfaces.finishSelect = {
		execute: function():Promise<[ SELECTResults, HTTPResponse ]> {
			return self._documents.executeSELECTQuery( self._entryPoint, self.getCompactSparqlQuery() );
		},
		executeRaw: function():Promise<[ RawResults, HTTPResponse ]> {
			return self._documents.executeRawSELECTQuery( self._entryPoint, self.getCompactSparqlQuery() );
		},
	};
};

export default QueryBuilder;
