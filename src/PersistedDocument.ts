import Context from "./Context";
import * as Document from "./Document";
import * as Errors from "./Errors";
import * as PersistedResource from "./PersistedResource";
import * as PersistedFragment from "./PersistedFragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

enum SpecialValue {
	ALL_VALUES
}

export interface Class extends PersistedResource.Class, Document.Class {
	_context:Context;
	_etag:string;

	refresh():Promise<void>;
	save():Promise<void>;
	destroy():Promise<void>;
}

function modificationsDeleteAllValues( deleteModifications:RDF.Value.Class[] ):boolean {
	return deleteModifications.length === 1 && deleteModifications[ 0 ] === SpecialValue.ALL_VALUES;
}

function getModifications( type:PersistedResource.ModificationType ):Map<string, RDF.Value.Class[]> {
	let modifications:Map<string, RDF.Value.Class[]>;
	switch ( type ) {
		case PersistedResource.ModificationType.ADD:
			modifications = this._modifications.add;
			break;
		case PersistedResource.ModificationType.SET:
			modifications = this._modifications.set;
			break;
		case PersistedResource.ModificationType.DELETE:
			modifications = this._modifications.delete;
			break;
		default:
			throw new Errors.IllegalStateError( "" );
	}
	return modifications;
}

function addModification( type:PersistedResource.ModificationType, propertyURI:string, value:any ):void {
	let modifications:Map<string, RDF.Value.Class[]> = getModifications.call( this, type, propertyURI );

	let values:RDF.Value.Class[];
	if ( modifications.has( propertyURI ) ) {
		values = modifications.get( propertyURI );
		for ( let i:number = 0, length:number = values.length; i < length; i ++ ) {
			if ( RDF.Value.Util.areEqual( values[ i ], value ) ) return;
		}
	} else {
		values = [];
		modifications.set( propertyURI, values );
	}

	values.push( value );
}

function removeModification( type:PersistedResource.ModificationType, propertyURI:string, value:any ):void {
	let modifications:Map<string, RDF.Value.Class[]> = getModifications.call( this, type, propertyURI );
	let values:RDF.Value.Class[] = modifications.get( propertyURI );
	for ( let i:number = 0, length:number = values.length; i < length; i ++ ) {
		if ( RDF.Value.Util.areEqual( values[ i ], value ) ) {
			values.splice( i, 1 );
			break;
		}
	}
}

function registerAddModification( propertyURI:string, value:any ):void {
	this._dirty = true;

	if ( this._modifications.delete.has( propertyURI ) ) {
		let deleteModifications:RDF.Value.Class[] = this._modifications.delete.get( propertyURI );

		if ( modificationsDeleteAllValues( deleteModifications ) ) {
			this._modifications.delete.delete( propertyURI );
			addModification.call( this, PersistedResource.ModificationType.SET, propertyURI, value );
			return;
		}

		removeModification.call( this, PersistedResource.ModificationType.DELETE, propertyURI, value );

		for ( let i:number = 0, length:number = deleteModifications.length; i < length; i ++ ) {
			if ( RDF.Value.Util.areEqual( deleteModifications[ i ], value ) ) {
				deleteModifications.splice( i, 1 );
				break;
			}
		}
	} else if ( this._modifications.set.has( propertyURI ) ) {
		addModification.call( this, PersistedResource.ModificationType.SET, propertyURI, value );
	} else {
		addModification.call( this, PersistedResource.ModificationType.ADD, propertyURI, value );
	}
}

function registerDeleteModification( propertyURI:string, value:any = null ):void {
	this._dirty = true;

	if ( Utils.isNull( value ) ) value = SpecialValue.ALL_VALUES;

	if ( value === SpecialValue.ALL_VALUES ) {
		if ( this._modifications.add.has( propertyURI ) ) this._modifications.add.delete( propertyURI );
		if ( this._modifications.set.has( propertyURI ) ) this._modifications.set.delete( propertyURI );
		if ( this._modifications.delete.has( propertyURI ) ) this._modifications.delete.delete( propertyURI );
	} else {
		if ( this._modifications.add.has( propertyURI ) ) removeModification.call( this, PersistedResource.ModificationType.ADD, propertyURI, value );
		if ( this._modifications.set.has( propertyURI ) ) removeModification.call( this, PersistedResource.ModificationType.SET, propertyURI, value );
	}

	addModification.call( this, PersistedResource.ModificationType.DELETE, propertyURI, value );
}

function isDirty():boolean {
	/* tslint:disable: typedef */
	for( let fragment of this.getFragments() ) {
		/* tslint:enable: typedef */
		if( fragment.isDirty() ) return true;
	}
	return false;
}

function refresh():Promise<void> {
	// TODO
	return null;
}
function save():Promise<void> {
	// TODO: FT
	return this._context.Documents.save( this );
}
function destroy():Promise<void> {
	// TODO
	return null;
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
				value: context
			},
			"_etag": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: null
			},
			"refresh": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: refresh
			},
			"save": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: save
			},
			"destroy": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: destroy
			}
		} );

		// Overwrite isDirty to also take into account the fragments state
		persisted.isDirty = (function():() => boolean {
			let superFunction:() => boolean = persisted.isDirty;
			return function():boolean {
				return superFunction.call( this ) || isDirty.call( this );
			};
		})();

		persisted._propertyAddedCallbacks.push( registerAddModification );
		persisted._propertyDeletedCallbacks.push( registerDeleteModification );

		return <any> persisted;
	}
}

export default Class;
