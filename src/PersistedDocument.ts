import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Pointer.Class, PersistedResource.Class, Document.Class {
	_documents:Documents;
	_etag:string;

	refresh():Promise<void>;
	save():Promise<void>;
	destroy():Promise<void>;
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
	return this._documents.save( this ).then( ( response:HTTP.Response.Class) => {
		return [ this, response ];
	});
}
function destroy():Promise<void> {
	return this._documents.delete( this );
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return (
			Utils.hasPropertyDefined( document, "_documents" ) &&
			Utils.hasPropertyDefined( document, "_etag" ) &&
			Utils.hasFunction( document, "refresh" ) &&
			Utils.hasFunction( document, "save" ) &&
			Utils.hasFunction( document, "destroy" )
		);
	}

	static is( object:Object ):boolean {
		return (
			// TODO: Add Document.Class check
			Factory.hasClassProperties( <any> object )
		);
	}

	static create( uri:string, documents:Documents ):Class {
		let document:Document.Class = Document.factory.create( uri );

		return Factory.decorate( document, documents );
	}

	static createFrom<T extends Object>( object:T, uri:string, documents:Documents ):Class {
		let document:Document.Class = Document.factory.createFrom( object, uri );

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

						return (<Class> this)._documents.hasPointer( id );
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
				value: ( function():( id:string ) => boolean {
					let superFunction:( id:string ) => boolean = persistedDocument.inScope;
					return function( id:string ):boolean {
						if( superFunction.call( this, id ) ) return true;

						return (<Class> this)._documents.inScope( id );
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
