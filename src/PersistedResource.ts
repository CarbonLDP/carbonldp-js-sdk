import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class {
	_snapshot:Object;
	_syncSnapshot:() => void;

	isDirty():boolean;

	revert():void;
}

function syncSnapshot():void {
	let resource:Class & Resource.Class = this;
	resource._snapshot = Utils.O.clone( resource, { arrays: true } );

	if( "id" in resource ) (resource._snapshot as Resource.Class).id = resource.id;
	if( "types" in resource ) (resource._snapshot as Resource.Class).types = Utils.O.clone( resource.types );
}

function isDirty():boolean {
	let resource:Class & Resource.Class = this;

	if( ! Utils.O.areEqual( resource, resource._snapshot, { arrays: true }, { id: true, types: true } ) ) return true;

	let response:boolean = false;
	if( "id" in resource ) response = response || (resource._snapshot as Resource.Class).id !== resource.id;
	if( "types" in resource ) response = response || ! Utils.O.areEqual( (resource._snapshot as Resource.Class).types, resource.types );

	return response;
}

function revert():void {
	let resource:Class & Resource.Class = this;

	for( let key of Object.keys( resource ) ) {
		if( ! ( key in resource._snapshot ) ) delete resource[ key ];
	}

	Utils.O.extend( resource, resource._snapshot, { arrays: true } );
}

export class Factory {
	static hasClassProperties( object:object ):object is Class {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" )
			&& Utils.hasFunction( object, "_syncSnapshot" )
			&& Utils.hasFunction( object, "isDirty" )
			&& Utils.hasFunction( object, "revert" )
		);
	}

	static decorate<T extends Object>( object:T, snapshot:Object = {} ):T & Class {
		if( Factory.hasClassProperties( object ) ) return object;

		let persistedResource:T & Class = <any> object;

		Object.defineProperties( persistedResource, {
			"_snapshot": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: snapshot,
			},
			"_syncSnapshot": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: syncSnapshot,
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
		} );

		return persistedResource;
	}
}

export default Class;
