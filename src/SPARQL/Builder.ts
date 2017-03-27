import Documents from "./../Documents";

import SELECTResults from "./SELECTResults";
import RawResults from "./RawResults";

import HTTPResponse from "./../HTTP/Response";

import SPARQLER from "sparqler";

declare module "sparqler/Clauses" {

	export interface FinishSelect {
		execute():Promise<[ SELECTResults, HTTPResponse ]>;
		executeRaw():Promise<[ RawResults, HTTPResponse ]>;
	}

}

declare module "sparqler/SPARQLER" {

	export interface SPARQLER {
		_documents:Documents;
		_entryPoint:string;
	}

}

// Add execute functions to the query builder
let queryPrototype:any = SPARQLER.prototype;
let superInit:Function = queryPrototype.initInterfaces;
queryPrototype.initInterfaces = function():void {
	superInit.call( this );
	let self:SPARQLER = this as SPARQLER;

	// Add execution of select
	this.interfaces.finishSelect = {
		execute: function():Promise<[ SELECTResults, HTTPResponse ]> {
			return self._documents.executeSELECTQuery( self._entryPoint, self.toCompactString() );
		},
		executeRaw: function():Promise<[ RawResults, HTTPResponse ]> {
			return self._documents.executeRawSELECTQuery( self._entryPoint, self.toCompactString() );
		},
	};
};

export {
	SPARQLER as Class
}

export default SPARQLER;
