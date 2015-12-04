import Context from "./Context";
import * as Document from "./Document";
import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends PersistedResource.Class, Document.Class {
	_context:Context;
	_etag:string;

	refresh():Promise<void>;
	save():Promise<void>;
	destroy():Promise<void>;
}

function isDirty():boolean {
	for( let fragment of this.getFragments() ) {
		if( fragment.isDirty() ) return true;
	}
	return false;
}

function refresh():Promise<void> {
	// TODO
	return null;
}
function save():Promise<void> {
	return this._context.Documents.save( this ).then( ( response:HTTP.Response.Class) => {
		// TODO
	});
}
function destroy():Promise<void> {
	return this._context.Documents.delete( this ).then( ( response:HTTP.Response.Class) => {
		// TODO
	});
}

export class Factory {
	static hasClassProperties( document:Document.Class ):boolean {
		return (
			Utils.hasPropertyDefined( document, "_context" ) &&
			Utils.hasPropertyDefined( document, "_etag" ) &&
			Utils.hasFunction( document, "refresh" ) &&
			Utils.hasFunction( document, "save" ) &&
			Utils.hasFunction( document, "destroy" )
		);
	}

	static from( documents:Document.Class[], context:Context ):Class[];
	static from( document:Document.Class, context:Context ):Class;
	static from( documents:any, context:Context ):any {
		if( ! context ) throw new Errors.IllegalArgumentError( "The context cannot be null/undefined." );
		if( ! Utils.isArray( documents ) ) return Factory.singleFrom( <Document.Class> documents, context );

		for ( let i:number = 0, length:number = documents.length; i < length; i ++ ) {
			let document:Document.Class = documents[ i ];
			Factory.singleFrom( document, context );
		}

		return <Document.Class[]> documents;
	}

	protected static singleFrom( document:Document.Class, context:Context ):Class {
		let persisted:( Document.Class & PersistedResource.Class ) = PersistedResource.Factory.from<Document.Class>( document );

		let persistedDocument:Class = Factory.hasClassProperties( document ) ? <any> persisted : Factory.injectBehavior( persisted, context );

		PersistedFragment.Factory.from( persistedDocument.getFragments() );

		return persistedDocument;
	}

	protected static injectBehavior( persisted:( Document.Class & PersistedResource.Class ), context:Context ):Class {
		if( Factory.hasClassProperties( persisted ) ) return <any> persisted;

		Object.defineProperties( persisted, {
			"_context": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: context,
			},
			"_etag": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: null,
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

		// Overwrite isDirty to also take into account the fragments state
		persisted.isDirty = (function():() => boolean {
			let superFunction:() => boolean = persisted.isDirty;
			return function():boolean {
				return superFunction.call( this ) || isDirty.call( this );
			};
		})();

		return <any> persisted;
	}
}

export default Class;
