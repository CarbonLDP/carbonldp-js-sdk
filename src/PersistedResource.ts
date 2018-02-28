import { Resource } from "./Resource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import * as Utils from "./Utils";

export interface Class extends Resource {
	_snapshot:Resource;
	_syncSnapshot:() => void;

	_partialMetadata?:PartialMetadata;

	isDirty():boolean;

	revert():void;


	isPartial():boolean;
}

function syncSnapshot( this:Class ):void {
	this._snapshot = Utils.ObjectUtils.clone( this, { arrays: true } );

	this._snapshot.id = this.id;
	this._snapshot.types = this.types.slice();
}

function isDirty():boolean {
	let resource:Class & Resource = this;

	if( ! Utils.ObjectUtils.areEqual( resource, resource._snapshot, { arrays: true } ) ) return true;

	let response:boolean = false;
	if( "id" in resource ) response = response || (resource._snapshot as Resource).id !== resource.id;
	if( "types" in resource ) response = response || ! Utils.ObjectUtils.areEqual( (resource._snapshot as Resource).types, resource.types );

	return response;
}

function revert():void {
	let resource:Class & Resource = this;

	for( let key of Object.keys( resource ) ) {
		if( ! ( key in resource._snapshot ) ) delete resource[ key ];
	}

	Utils.ObjectUtils.extend( resource, resource._snapshot, { arrays: true } );
}

function isPartial( this:Class ):boolean {
	return ! ! this._partialMetadata;
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" )
			&& Utils.hasFunction( object, "_syncSnapshot" )
			&& Utils.hasFunction( object, "isDirty" )
			&& Utils.hasFunction( object, "isPartial" )
			&& Utils.hasFunction( object, "revert" )
		);
	}

	static decorate<T extends Resource>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		let persistedResource:T & Class = <any> object;

		Object.defineProperties( persistedResource, {
			"_snapshot": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: {},
			},
			"_syncSnapshot": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: syncSnapshot,
			},

			"_partialMetadata": {
				writable: true,
				enumerable: false,
				configurable: true,
			},

			"isDirty": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isDirty,
			},
			"revert": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: revert,
			},

			"isPartial": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isPartial,
			},
		} );

		return persistedResource;
	}
}

export default Class;
