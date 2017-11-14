import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends Resource.Class {
	_snapshot:Resource.Class;
	_syncSnapshot:() => void;

	isDirty():boolean;

	revert():void;
}

function syncSnapshot( this:Class ):void {
	this._snapshot = Utils.O.clone( this, { arrays: true } );

	this._snapshot.id = this.id;
	this._snapshot.types = this.types.slice();
}

function isDirty():boolean {
	let resource:Class & Resource.Class = this;

	if( ! Utils.O.areEqual( resource, resource._snapshot, { arrays: true } ) ) return true;

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
	static hasClassProperties( object:object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" )
			&& Utils.hasFunction( object, "_syncSnapshot" )
			&& Utils.hasFunction( object, "isDirty" )
			&& Utils.hasFunction( object, "revert" )
		);
	}

	static decorate<T extends Resource.Class>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return <any> object;

		let persistedResource:Class = <any> object;

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

		return <any> persistedResource;
	}
}

export default Class;
