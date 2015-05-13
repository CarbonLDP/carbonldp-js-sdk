/// <reference path="../../typings/es6/es6.d.ts" />
/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />

import * as DocumentResource from './DocumentResource';
import Committer from '../Committer';
import * as Literal from './Literal';
import * as RDFNode from './RDFNode';
import * as Utils from '../Utils';
import * as Value from './Value';

class Modifications {
	add:Map<string, Value.Class[]>;
	set:Map<string, Value.Class[]>;
	delete:Map<string, Value.Class[]>;

	constructor() {
		this.add = new Map<string, Value.Class[]>();
		this.set = new Map<string, Value.Class[]>();
		this.delete = new Map<string, Value.Class[]>();
	}
}

enum ModificationType {
	ADD,
	SET,
	DELETE
}

enum SpecialValue {
	ALL_VALUES
}

interface PersistedDocumentResource extends DocumentResource.Class {
	_dirty:boolean;
	_modifications:Modifications;
	_commiter:Committer;
	_clean():void;

	isDirty():boolean;

	commit():Promise<any>;
	delete():void;
}

function modificationsDeleteAllValues( deleteModifications:Value.Class[] ):boolean {
	return deleteModifications.length === 1 && deleteModifications[ 0 ] === SpecialValue.ALL_VALUES;
}

function getModifications( type:ModificationType ):Map<string, Value.Class[]> {
	var modifications:Map<string, Value.Class[]>;
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
	}
	return modifications;
}

function addModification( type:ModificationType, propertyURI:string, value:any ):void {
	var modifications:Map<string, Value.Class[]> = getModifications.call( this, type, propertyURI );

	var values:Value.Class[];
	if ( modifications.has( propertyURI ) ) {
		values = modifications.get( propertyURI );
		for ( let i:number = 0, length:number = values.length; i < length; i ++ ) {
			if ( Value.Util.areEqual( values[ i ], value ) ) return;
		}
	} else {
		values = [];
		modifications.set( propertyURI, values );
	}

	values.push( value );
}

function removeModification( type:ModificationType, propertyURI:string, value:any ):void {
	var modifications:Map<string, Value.Class[]> = getModifications.call( this, type, propertyURI );
	var values:Value.Class[] = modifications.get( propertyURI );
	for ( let i:number = 0, length:number = values.length; i < length; i ++ ) {
		if ( Value.Util.areEqual( values[ i ], value ) ) {
			values.splice( i, 1 );
			break;
		}
	}
}

function registerAddModification( propertyURI:string, value:any ):void {
	this._dirty = true;

	if ( this._modifications.delete.has( propertyURI ) ) {
		var deleteModifications:Value.Class[] = this._modifications.delete.get( propertyURI );

		if ( modificationsDeleteAllValues( deleteModifications ) ) {
			this._modifications.delete.delete( propertyURI );
			addModification.call( this, ModificationType.SET, propertyURI, value );
			return;
		}

		removeModification.call( this, ModificationType.DELETE, propertyURI, value );

		for ( let i:number = 0, length:number = deleteModifications.length; i < length; i ++ ) {
			if ( Value.Util.areEqual( deleteModifications[ i ], value ) ) {
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

function clean():void {
	this._modifications = new Modifications();
	this._dirty = true;
}

function isDirty():boolean {
	return this._dirty;
}

function commit():Promise<any> {
	return this._committer.commit( this );
}

function destroy():any {
	// TODO: Implement
}

class Factory {
	static is( value:any ) {
		//@formatter:off
		return (
			DocumentResource.Factory.is( value ) &&

			Utils.hasProperty( value, '_dirty' ) &&
			Utils.hasProperty( value, '_modifications' ) &&
			Utils.hasProperty( value, '_parent' ) &&
			Utils.hasFunction( value, '_clean' ) &&

			Utils.hasFunction( value, 'isDirty' ) &&

			Utils.hasFunction( value, 'commit' ) &&
			Utils.hasFunction( value, 'delete' )
		);
		//@formatter:on
	}

	static from( documentResource:DocumentResource.Class, committer:Committer ):PersistedDocumentResource {
		var persisted:PersistedDocumentResource = <PersistedDocumentResource> documentResource;
		if ( ! Factory.is( persisted ) ) {
			Object.defineProperties( persisted, {
				'_dirty': {
					writable: true,
					enumerable: false,
					value: false
				},
				'_modifications': {
					writable: false,
					enumerable: false,
					value: new Modifications()
				},
				'_parent': {
					writable: false,
					enumerable: false,
					value: parent
				}
			} );

			persisted._propertyAddedCallbacks.push( registerAddModification );
			persisted._propertyDeletedCallbacks.push( registerDeleteModification );

			persisted._clean = clean;

			persisted.isDirty = isDirty;
			persisted.commit = commit;
			persisted.delete = destroy;
		}
		return persisted;
	}
}

export { PersistedDocumentResource as Class, Factory };