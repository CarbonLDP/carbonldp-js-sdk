/// <reference path="./../typings/es6/es6.d.ts" />
import * as Errors from "./Errors";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export class Modifications {
	add:Map<string, RDF.Value.Class[]>;
	set:Map<string, RDF.Value.Class[]>;
	delete:Map<string, RDF.Value.Class[]>;

	constructor() {
		this.add = new Map<string, RDF.Value.Class[]>();
		this.set = new Map<string, RDF.Value.Class[]>();
		this.delete = new Map<string, RDF.Value.Class[]>();
	}
}

enum SpecialValue {
	ALL_VALUES
}

export enum ModificationType {
	ADD,
	SET,
	DELETE
}

export interface Class {
	_dirty:boolean;
	_modifications:Modifications;

	isDirty():boolean;
}

function modificationsDeleteAllValues( deleteModifications:RDF.Value.Class[] ):boolean {
	return deleteModifications.length === 1 && deleteModifications[ 0 ] === SpecialValue.ALL_VALUES;
}

function getModifications( type:ModificationType ):Map<string, RDF.Value.Class[]> {
	let modifications:Map<string, RDF.Value.Class[]>;
	switch ( type ) {
		case ModificationType.ADD:
			modifications = this._modifications.add;
			break;
		case ModificationType.SET:
			modifications = this._modifications.set;
			break;
		case ModificationType.DELETE:
			modifications = this._modifications.delete;
			break;
		default:
			throw new Errors.IllegalStateError( "" );
	}
	return modifications;
}

function addModification( type:ModificationType, propertyURI:string, value:any ):void {
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

function removeModification( type:ModificationType, propertyURI:string, value:any ):void {
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
			addModification.call( this, ModificationType.SET, propertyURI, value );
			return;
		}

		removeModification.call( this, ModificationType.DELETE, propertyURI, value );

		for ( let i:number = 0, length:number = deleteModifications.length; i < length; i ++ ) {
			if ( RDF.Value.Util.areEqual( deleteModifications[ i ], value ) ) {
				deleteModifications.splice( i, 1 );
				break;
			}
		}
	} else if ( this._modifications.set.has( propertyURI ) ) {
		addModification.call( this, ModificationType.SET, propertyURI, value );
	} else {
		addModification.call( this, ModificationType.ADD, propertyURI, value );
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
		if ( this._modifications.add.has( propertyURI ) ) removeModification.call( this, ModificationType.ADD, propertyURI, value );
		if ( this._modifications.set.has( propertyURI ) ) removeModification.call( this, ModificationType.SET, propertyURI, value );
	}

	addModification.call( this, ModificationType.DELETE, propertyURI, value );
}

function isDirty():boolean {
	return this._dirty;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_dirty" ) &&
			Utils.hasPropertyDefined( object, "_modifications" ) &&
			Utils.hasFunction( object, "isDirty" )
		);
	}

	static is( object:Object ):boolean {
		return (
			Factory.hasClassProperties( object )
		);
	}

	static from<T extends RDF.Resource.Class>( object:T ):T & Class;
	static from<T extends RDF.Resource.Class>( objects:T[] ):(T & Class)[];
	static from<T extends RDF.Resource.Class>( objectOrObjects:any ):any {
		if( ! Utils.isArray( objectOrObjects ) ) return Factory.singleFrom<T>( objectOrObjects );

		for ( let i:number = 0, length:number = objectOrObjects.length; i < length; i ++ ) {
			Factory.singleFrom( objectOrObjects[ i ] );
		}

		return <(T & Class)[]> objectOrObjects;
	}

	private static singleFrom<T extends RDF.Resource.Class>( object:T ):( T & Class ) {
		let persistedResource:( T & Class ) = <any> object;
		if( ! Factory.hasClassProperties( object ) ) persistedResource = this.injectBehavior<T>( persistedResource );
		return persistedResource;
	}

	private static injectBehavior<T extends RDF.Resource.Class>( persistedResource:( T & Class ) ):( T & Class ) {
		Object.defineProperties( persistedResource, {
			"_dirty": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: false,
			},
			"_modifications": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: new Modifications(),
			},
			"isDirty": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: isDirty,
			},
		} );

		persistedResource._propertyAddedCallbacks.push( registerAddModification );
		persistedResource._propertyDeletedCallbacks.push( registerDeleteModification );

		return persistedResource;
	}
}

export default Class;
