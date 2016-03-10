import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as SPARQL from "./SPARQL";
import * as Utils from "./Utils";
import * as URI from "./RDF/URI";

export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
	_documents:Documents;
	_etag:string;

	refresh():Promise<void>;
	save():Promise<[Class, HTTP.Response.Class]>;
	destroy():Promise<HTTP.Response.Class>;

	executeRawASKQuery( askQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeASKQuery():Promise<[ boolean, HTTP.Response.Class ]>;
	executeRawSELECTQuery( selectQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]>;
	executeSELECTQuery():Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]>;
	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:HTTP.Request.Options ):Promise<[ string, HTTP.Response.Class ]>;
}

function isDirty():boolean {
	// TODO
	return null;
}

function refresh():Promise<void> {
	// TODO
	return null;
}
function save():Promise<void> {
	return this._documents.save( this );
}
function destroy():Promise<HTTP.Response.Class> {
	return this._documents.delete( this );
}

function executeRawASKQuery( askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeRawASKQuery( this.id, askQuery, requestOptions );
}

function executeASKQuery( askQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ boolean, HTTP.Response.Class ]> {
	return this._documents.executeASKQuery( this.id, askQuery, requestOptions );
}

function executeRawSELECTQuery( selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.RawResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeRawSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeSELECTQuery( selectQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ SPARQL.SELECTResults.Class, HTTP.Response.Class ]> {
	return this._documents.executeSELECTQuery( this.id, selectQuery, requestOptions );
}

function executeRawCONSTRUCTQuery( constructQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
	return this._documents.executeRawCONSTRUCTQuery( this.id, constructQuery, requestOptions );
}

function executeRawDESCRIBEQuery( describeQuery:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ string, HTTP.Response.Class ]> {
	return this._documents.executeRawDESCRIBEQuery( this.id, describeQuery, requestOptions );
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return (
			Utils.hasPropertyDefined( document, "_documents" ) &&
			Utils.hasPropertyDefined( document, "_etag" ) &&
			Utils.hasFunction( document, "refresh" ) &&
			Utils.hasFunction( document, "save" ) &&
			Utils.hasFunction( document, "destroy" ) &&

			Utils.hasFunction( document, "executeRawASKQuery" ) &&
			Utils.hasFunction( document, "executeASKQuery" ) &&
			Utils.hasFunction( document, "executeRawSELECTQuery" ) &&
			Utils.hasFunction( document, "executeSELECTQuery" ) &&
			Utils.hasFunction( document, "executeRawDESCRIBEQuery" ) &&
			Utils.hasFunction( document, "executeRawCONSTRUCTQuery" )
		);
	}

	static is( object:Object ):boolean {
		return Utils.isObject( object )
			&& Document.Factory.hasClassProperties( object )
			&& Factory.hasClassProperties( <any> object );
	}

	static create( uri:string, documents:Documents ):Class {
		let document:Document.Class = Document.Factory.create( uri );

		return Factory.decorate( document, documents );
	}

	static createFrom<T extends Object>( object:T, uri:string, documents:Documents ):Class {
		let document:Document.Class = Document.Factory.createFrom( object, uri );

		return Factory.decorate( document, documents );
	}

	static decorate<T extends Document.Class>( document:T, documents:Documents ):T & Class {
		if( Factory.hasClassProperties( document ) ) return <any> document;

		let persistedDocument:Class = <any> document;

		Object.defineProperties( persistedDocument, {
			"_documents": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: documents,
			},
			"_etag": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: null,
			},

			"hasPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: ( function():( id:string ) => boolean {
					let superFunction:( id:string ) => boolean = persistedDocument.hasPointer;
					return function( id:string ):boolean {
						if( superFunction.call( this, id ) ) return true;

						return ! URI.Util.isBNodeID( id )
							&& (<Class> this)._documents.hasPointer( id );
					};
				})(),
			},
			"getPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: ( function():( id:string ) => Pointer.Class {
					let superFunction:( id:string ) => Pointer.Class = persistedDocument.getPointer;
					let inScopeFunction:( id:string ) => boolean = persistedDocument.inScope;
					return function( id:string ):Pointer.Class {
						if( inScopeFunction.call( this, id ) ) return superFunction.call( this, id );

						return (<Class> this)._documents.getPointer( id );
					};
				})(),
			},
			"inScope": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: ( function():( idOrPointer:any ) => boolean {
					let superFunction:( idOrPointer:any ) => boolean = persistedDocument.inScope;
					return function( idOrPointer:any ):boolean {
						if( superFunction.call( this, idOrPointer ) ) return true;

						return (<Class> this)._documents.inScope( idOrPointer );
					};
				})(),
			},

			"refresh": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: refresh,
			},
			"save": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: save,
			},
			"destroy": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: destroy,
			},

			"executeRawASKQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawASKQuery,
			},
			"executeASKQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeASKQuery,
			},
			"executeRawSELECTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawSELECTQuery,
			},
			"executeSELECTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeSELECTQuery,
			},
			"executeRawCONSTRUCTQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawCONSTRUCTQuery,
			},
			"executeRawDESCRIBEQuery": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: executeRawDESCRIBEQuery,
			},
		} );

		/*

		// TODO: Overwrite isDirty to also take into account the fragments state
		// TODO: Update with the new comparison system
		persistedDocument.isDirty = (function():() => boolean {
			let superFunction:() => boolean = persistedDocument.isDirty;
			return function():boolean {
				return superFunction.call( this ) || isDirty.call( this );
			};
		})();

		*/

		return <any> persistedDocument;
	}
}

export default Class;
