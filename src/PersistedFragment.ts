import * as Fragment from "./Fragment";
import * as ObjectSchema from "./ObjectSchema";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedResource from "./PersistedResource";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends PersistedResource.Class, Fragment.Class {
	document: PersistedDocument.Class;
}

function resolveURI( uri:string ):string {
	if( RDF.URI.Util.isAbsolute( uri ) ) return uri;

	uri = ObjectSchema.Digester.resolvePrefixedURI( new RDF.URI.Class( uri ), (<Class> this).document._documents.getGeneralSchema() ).stringValue;

	let schema:ObjectSchema.DigestedObjectSchema = (<Class> this).document._documents.getSchemaFor( this );
	if( schema.vocab ) uri = RDF.URI.Util.resolve( schema.vocab, uri );

	return uri;
}
function extendAddType( superFunction:( type:string ) => void ):( type:string ) => void {
	return function( type:string ):void {
		type = resolveURI.call( this, type );
		superFunction.call( this, type );
	};
}
function extendHasType( superFunction:( type:string ) => boolean ):( type:string ) => boolean {
	return function( type:string ):boolean {
		type = resolveURI.call( this, type );
		return superFunction.call( this, type );
	};
}
function extendRemoveType( superFunction:( type:string ) => void ):( type:string ) => void {
	return function( type:string ):void {
		type = resolveURI.call( this, type );
		superFunction.call( this, type );
	};
}

export class Factory {
	static decorate<T extends Fragment.Class>( fragment:T, snapshot:Object = {} ):T & Class {
		PersistedResource.Factory.decorate( fragment, snapshot );

		Object.defineProperties( fragment, {
			"addType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendAddType( fragment.addType ),
			},
			"hasType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendHasType( fragment.hasType ),
			},
			"removeType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: extendRemoveType( fragment.removeType ),
			},
		} );

		return <any> fragment;
	}
}

export default Class;
