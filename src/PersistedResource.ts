import { ModelDecorator } from "./ModelDecorator";
import { Resource } from "./Resource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import * as Utils from "./Utils";

export interface PersistedResource extends Resource {
	_snapshot:Resource;

	_partialMetadata?:PartialMetadata;


	_syncSnapshot():void;


	isDirty():boolean;

	revert():void;


	isPartial():boolean;
}


export interface PersistedResourceFactory extends ModelDecorator<PersistedResource> {
	isDecorated( object:object ):object is PersistedResource;


	decorate<T extends object>( object:T ):T & PersistedResource;
}


function syncSnapshot( this:PersistedResource ):void {
	this._snapshot = Utils.ObjectUtils.clone( this, { arrays: true } );

	this._snapshot.id = this.id;
	this._snapshot.types = this.types.slice();
}

function isDirty( this:PersistedResource ):boolean {
	if( ! Utils.ObjectUtils.areEqual( this, this._snapshot, { arrays: true } ) ) return true;

	let response:boolean = false;
	if( "id" in this ) response = response || (this._snapshot as Resource).id !== this.id;
	if( "types" in this ) response = response || ! Utils.ObjectUtils.areEqual( (this._snapshot as Resource).types, this.types );

	return response;
}

function revert( this:PersistedResource ):void {
	for( let key of Object.keys( this ) ) {
		if( ! ( key in this._snapshot ) ) delete this[ key ];
	}

	Utils.ObjectUtils.extend( this, this._snapshot, { arrays: true } );
}

function isPartial( this:PersistedResource ):boolean {
	return ! ! this._partialMetadata;
}

export const PersistedResource:PersistedResourceFactory = {
	isDecorated( object:object ):object is PersistedResource {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" )
			&& Utils.hasFunction( object, "_syncSnapshot" )
			&& Utils.hasFunction( object, "isDirty" )
			&& Utils.hasFunction( object, "isPartial" )
			&& Utils.hasFunction( object, "revert" )
		);
	},

	decorate<T extends object>( object:T ):T & PersistedResource {
		if( PersistedResource.isDecorated( object ) ) return object;

		Resource.decorate( object );

		const persistedResource:T & PersistedResource = object as T & PersistedResource;
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
	},
};
